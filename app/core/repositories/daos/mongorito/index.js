'use strict';

const Mongorito = require('./libs/mongorito');
const Promise = require('bluebird');
const _ = require('lodash');
const Query = require('./query');

class Model {
    constructor(attrs, options) {
        this.attributes = _.assign({}, attrs);
        this.changed = {};
        this.previous = {};
        this.options = options || {};
    }
}

/**
 * Get database for a model
 *
 * @api private
 */

Model._db = function () {
	// support for multiple connections
	// if model has a custom database assigned
	// use it, otherwise use the default
	let db = this.prototype.db ? this.prototype.db() : Mongorito._connection;

	return Promise.resolve(db);
};


/**
 * Get collection for a model
 *
 * @api private
 */

Model._collection = function () {
	let self = this;

	return this._db().then(function (db) {
		if (_.isString(self.prototype.collection)) {
			return Mongorito._collection(db, self.prototype.collection);
		}

		// get collection name
		// from the "collection" property
		// or generate the default one
		let defaultName = self.name.toLowerCase();
		let name = _.result(self.prototype, 'collection', defaultName);

		// save collection name
		// to avoid the same check in future
		self.prototype.collection = name;

		return Mongorito._collection(db, name);
	});
};


/**
 * Find documents
 *
 * @param {Object} query - find conditions, same as this.where()
 * @api public
 */

Model.find = function (query) {
	// collection, model
	return new Query(this._collection(), this).find(query);
};


/**
 * Count documents
 *
 * @param {Object} query - find conditions, same as this.where()
 * @api public
 */

Model.count = function (query) {
	// collection, model
	return new Query(this._collection(), this).count(query);
};

/**
 * Get distinct
 *
 * @param {String} field for distinct
 * @param {Object} query - query to filter the results
 * @see http://mongodb.github.io/node-mongodb-native/2.0/api/Collection.html#distinct
 * @api public
 */

Model.distinct = function (field, query) {
	// collection, model
	return new Query(this._collection(), this).distinct(field, query);
};


/**
 * Aggregation query
 *
 * @param {String} pipeline aggregation pipeline
 * @param {Object} options - Options to be passed to aggregation pipeline
 * @see http://mongodb.github.io/node-mongodb-native/2.0/api/Collection.html#distinct
 * @api public
 */

Model.aggregate = function (pipeline) {
	return new Query(this._collection(), this).aggregate(pipeline);
};



/**
 * Find all documents in a collection
 *
 * @api public
 */

Model.all = function () {
	return this.find();
};


/**
 * Find one document
 *
 * @param {Object} query - find conditions, same as this.where()
 * @api public
 */

Model.findOne = function (query) {
	return new Query(this._collection(), this).findOne(query);
};


/**
 * Find a document by ID
 *
 * @param {ObjectID} id - document id
 * @api public
 */

Model.findById = function (id) {
	return new Query(this._collection(), this).findById(id);
};


/**
 * Remove documents
 *
 * @param {Object} query - remove conditions, same as this.where()
 * @api public
 */

Model.remove = function (query) {
	// collection, model
	return new Query(this._collection(), this).remove(query);
};


/**
 * Drop collection
 *
 * @api public
 */

Model.drop = function () {
	return this._collection().then(function (collection) {
		return collection.drop();
	});
};


/**
 * Set up an index
 *
 * @see http://mongodb.github.io/node-mongodb-native/2.0/api/Db.html#ensureIndex
 * @api public
 */

Model.index = function () {
	let args = Array.prototype.slice.call(arguments);

	return this._collection().then(function (collection) {
		return collection.ensureIndex.apply(collection, args);
	});
};


/**
 * List all indexes
 *
 * @see http://mongodb.github.io/node-mongodb-native/2.0/api/Collection.html#listIndexes
 * @api public
 */

Model.indexes = function () {
	let args = Array.prototype.slice.call(arguments);

	return this._collection().then(function (collection) {
		let cursor = collection.listIndexes.apply(collection, args);

		return cursor
			.toArray()
			.then(function (indexes) {
				cursor.close();

				return indexes;
			});
	});
};

// Setting up functions that have
// the same implementation
// and act as a bridge to Query
const methods = [
	'where',
	'limit',
	'skip',
	'sort',
	'exists',
	'lt',
	'lte',
	'gt',
	'gte',
	'in',
	'nin',
	'and',
	'or',
	'ne',
	'nor',
	'populate',
	'matches',
	'match',
	'include',
	'exclude',
	'search'
];

methods.forEach(function (method) {
	Model[method] = function () {
		// collection, model
		let query = new Query(this._collection(), this);
		query[method].apply(query, arguments);

		return query;
	};
});

module.exports = Model;