'use strict';

const _ = require('lodash');
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

/**
* Connector
*
* Main class, manages mongodb connection and collections
*/

class Connector {}

Connector.connect = function () {
	// parse arguments
	let args = Array.prototype.slice.call(arguments);

	let urls = [];
	let options = {};

	args.forEach(function (arg) {
		if (_.isString(arg))
			urls.push(arg);

		if (_.isObject(arg))
			options = arg;
	});

	let connection = MongoClient.connect(urls.join(','), options).then((db) => {
		if (!this.db) {
			db.url = urls.join(',');
			this.db = db;
		}

		return db;
	});

	if (!this._connection)
		this._connection = connection;

	return connection;
};


/**
 * Disconnect from a database
 *
 * @api public
 */

Connector.disconnect = function () {
	return this.db.close();
};


/**
 * Alias for .disconnect()
 *
 * @api public
 */

Connector.close = function () {
	return Connector.disconnect.apply(this, arguments);
};


/**
 * Return a co-wrapped monk collection
 *
 * @api private
 */

Connector._collection = function (db, name) {
	let url = db.url;
	let collections = this._collections[url];

	if (!collections)
		collections = this._collections[url] = {};

	if (collections[name])
		return collections[name];

	let collection = db.collection(name);
	collections[name] = collection;
	return collections[name];
};


/**
 * Cache for collections
 *
 * @api private
 */

Connector._collections = {};

module.exports = Connector;