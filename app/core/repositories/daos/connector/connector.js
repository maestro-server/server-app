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

Connector.connect = function (path, dbname, options = {}) {

	this.url = path;
	this.dbname = path;

	const strOpts = {
		useUnifiedTopology: true,
		useNewUrlParser: true
	};

	let connection = MongoClient.connect(path, strOpts, options)
		.then((client) => {
			if (!this.db)
				this.db = client.db(dbname);

			return this.db;
		})
		.catch(console.log);

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
	const url = this.url;
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