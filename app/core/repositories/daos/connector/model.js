'use strict';

const Connector = require('./connector');
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

Model._db = function () {
	let db = this.prototype.db ? this.prototype.db() : Connector._connection;

	return Promise.resolve(db);
};

Model._collection = function () {
	return this._db().then((db) => {
		if (_.isString(this.prototype.collection)) {
			return Connector._collection(db, this.prototype.collection);
		}

		let defaultName = this.name.toLowerCase();
		let name = _.result(this.prototype, 'collection', defaultName);
		this.prototype.collection = name;
		return Connector._collection(db, name);
	});
};

Model.find = function (query) {
	return new Query(this._collection(), this).find(query);
};

Model.count = function (query) {
	return new Query(this._collection(), this).count(query);
};

Model.distinct = function (field, query) {
	return new Query(this._collection(), this).distinct(field, query);
};

Model.aggregate = function (pipeline) {
	return new Query(this._collection(), this).aggregate(pipeline);
};

Model.findOne = function (query) {
	return new Query(this._collection(), this).findOne(query);
};

Model.findById = function (id) {
	return new Query(this._collection(), this).findById(id);
};


Model.remove = function (query) {
	return new Query(this._collection(), this).remove(query);
};


Model.drop = function () {
	return this._collection().then(function (collection) {
		return collection.drop();
	});
};


Model.index = function () {
	let args = Array.prototype.slice.call(arguments);
	return this._collection().then((collection) => collection.ensureIndex.apply(collection, args));
};

Model.indexes = function () {
	let args = Array.prototype.slice.call(arguments);

	return this._collection().then((collection) => {
		let cursor = collection.listIndexes.apply(collection, args);

		return cursor
			.toArray()
			.then((indexes) => {
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
		let query = new Query(this._collection(), this);
		query[method].apply(query, arguments);

		return query;
	};
});

module.exports = Model;
