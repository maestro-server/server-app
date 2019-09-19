'use strict';

const _ = require('lodash');
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

/**
* Mongorito
*
* Main class, manages mongodb connection and collections
*/

class Mongorito {}

Mongorito.connect = function () {
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

	urls = urls.map((url) => {
		if (!url.startsWith('mongodb://'))
			url = 'mongodb://' + url;

		return url;
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

Mongorito.disconnect = function () {
	return this.db.close();
};


/**
 * Alias for .disconnect()
 *
 * @api public
 */

Mongorito.close = function () {
	return Mongorito.disconnect.apply(this, arguments);
};


/**
 * Return a co-wrapped monk collection
 *
 * @api private
 */

Mongorito._collection = function (db, name) {
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

Mongorito._collections = {};

module.exports = Mongorito;