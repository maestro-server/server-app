'use strict';

const _ = require('lodash');
const toObjectId = require('./libs/to-objectid');
const Promise = require('bluebird');

class Query {
	constructor(collection, model, key) {
		this.collection = collection;
		this.model = model;
		this.query = {};
		this.options = {
			populate: {},
			sort: {},
			projection: {}
		};
		this.lastKey = key;
	}
}

Query.prototype.where = function (key, value) {
	// if object was passed instead of key-value pair
	// iterate over that object and call .where(key, value)
	if (_.isObject(key)) {
		let conditions = key;
		let keys = Object.keys(conditions);

		keys.forEach((k) => this.where(k, conditions[k]));
	}

	if (_.isString(key)) {
		if (_.isUndefined(value)) {
			this.lastKey = key;
			return this;
		}

		if (_.isRegExp(value))
			value = { $regex: value };

		if (_.isArray(value))
			value = { $in: value };

		this.query[key] = value;
	}

	return this;
};

Query.prototype.matches = function (key, value) {
	if (this.lastKey) {
		value = key;
		key = this.lastKey;
		this.lastKey = null;
	}

	this.query[key] = { $elemMatch: value };
	return this;
};

Query.prototype.match = function () {
	return this.matches.apply(this, arguments);
};

Query.prototype.include = function (key, value) {
	if (Array.isArray(key)) {
		let projection = key;
		projection.forEach((k) => this.include(k));

	} else if (_.isObject(key)) {
		let projection = key;
		let keys = Object.keys(projection);

		keys.forEach((k) => this.include(k, projection[k]));
	}

	if (_.isString(key))
		this.options.projection[key] = value === undefined ? 1 : value;

	return this;
};

Query.prototype.exclude = function (key, value) {

	if (Array.isArray(key)) {
		let projection = key;
		projection.forEach((k) => this.exclude(k));

	} else if (_.isObject(key)) {
		let projection = key;
		let keys = Object.keys(projection);

		keys.forEach((k) => this.exclude(k, projection[k]));
	}

	if (_.isString(key))
		this.options.projection[key] = value === undefined ? 0 : value;

	return this;
};

Query.prototype.search = function (text) {
	this.where({
		'$text': {
			'$search': text
		}
	});

	return this;
};

Query.prototype.distinct = function (field, query) {
	this.where(query);
	return this.collection.then((collection) => collection.distinct(field, this.query));
};

Query.prototype.aggregate = function (pipeline) {
	return this.collection.then((collection) => {
		let cursor = collection.aggregate(pipeline, { cursor: { batchSize: 1 } });
		return cursor
			.toArray()
			.then((docs) => {
				cursor.close();
				return docs;
			});
	});
};

Query.prototype.limit = function (limit) {
	this.options.limit = limit;

	return this;
};

Query.prototype.skip = function (skip) {
	this.options.skip = skip;

	return this;
};

Query.prototype.sort = function (key, value) {
	if (_.isObject(key))
		_.assign(this.options.sort, key);

	if (_.isString(key) && value)
		this.options.sort[key] = value;

	return this;
};

Query.prototype.equals = function (value) {
	let key = this.lastKey;
	this.lastKey = null;

	this.query[key] = value;

	return this;
};

Query.prototype.exists = function (key, exists) {
	if (this.lastKey) {
		exists = key;
		key = this.lastKey;
		this.lastKey = null;
	}

	this.query[key] = { $exists: (exists === undefined ? true : exists) };

	return this;
};

Query.prototype.populate = function (key, model) {
	this.options.populate[key] = model;

	return this;
};

Query.prototype.count = function (query) {
	this.where(query);

	return this.collection.then((collection) => collection.countDocuments(this.query));
};

Query.prototype.find = function (query, options) {
	let Model = this.model;

	query = _.assign({}, this.query, query);

	// query options
	options = _.assign({}, this.options, options);

	// fields to populate
	let populate = Object.keys(options.populate);

	// ensure _id is ObjectId
	if (query._id) {
		if (_.isObject(query._id)) {
			if (query._id.$in) {
				let convertedIds = [];

				query._id.$in.forEach(function (id) {
					convertedIds.push(toObjectId(id));
				});

				query._id.$in = convertedIds;
			}
		} else {
			query._id = toObjectId(query._id);
		}
	}



	// find
	return this.collection
		.then((collection) => {
			let cursor = collection.find(query, options);

			return cursor
				.toArray()
				.then((docs) => {
					cursor.close();
					return docs;
				});
		})
		.map((doc) => {
			return Promise.each(populate, (key) => {
				let childModel = options.populate[key];
				let idsArray = doc[key];

				let promise = childModel.findById(idsArray);

				return promise.then((subdocs) => {
					// reorder the received documents as ordered in the IDs Array
					let orderedDocuments = idsArray.slice();
					subdocs.map((dc) => {
						let id = toObjectId(dc.get('_id'));
						for (let index in idsArray) {
							if (idsArray[index].equals && idsArray[index].equals(id)) {
								orderedDocuments[index] = dc;
							}
						}
					});

					doc[key] = orderedDocuments;
				});
			}).then(() => {
				return new Model(doc, {
					populate: options.populate
				});
			});
		});
};

Query.prototype.findOne = function (query) {
	return this.find(query)
		.then((docs) => docs[0]);
};

Query.prototype.findById = function (id) {
	if (Array.isArray(id)) {
		let ids = id.map((iid) => toObjectId(iid));
		return this.find({ _id: { $in: ids } });
	}

	return this.findOne({ _id: toObjectId(id) });
};

Query.prototype.remove = function (query) {
	this.where(query);
	return this.collection.then((collection) => collection.deleteMany(this.query, this.options));
};

// Setting up functions that
// have the same implementation
const methods = [
	'lt',
	'lte',
	'gt',
	'gte',
	'in',
	'nin',
	'ne'
];

methods.forEach(function (method) {
	Query.prototype[method] = function (key, value) {
		// if .where() was called with one argument
		// key was already set in this.lastKey
		if (this.lastKey) {
			value = key;
			key = this.lastKey;
			this.lastKey = null;
		}

		let operator = '$' + method;
		let hasValue = value !== undefined;

		if (hasValue) {
			this.query[key] = {};
			this.query[key][operator] = value;
		} else {
			this.query[operator] = key;
		}

		return this;
	};
});

// or, nor and and share the same imlpementation
['or', 'nor', 'and'].forEach(function (method) {
	Query.prototype[method] = function () {
		let args = Array.isArray(arguments[0]) ? arguments[0] : Array.prototype.slice.call(arguments);
		let operator = '$' + method;

		this.query[operator] = args;

		return this;
	};
});

module.exports = Query;