'use strict';

const {ObjectId} = require('mongodb');

/**
 * Ensure that ids are always instances of ObjectId
 */

function toObjectId (id) {
	if (id instanceof ObjectId) {
		return id;
	}

	return new ObjectId(id);
}

module.exports = toObjectId;