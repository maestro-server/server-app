"use strict";

const _ = require('lodash');
const {ObjectId} = require('mongorito');

module.exports = (_id) => {
  return _.isArray(_id)
  ? {$in: _.map(_id, e=>ObjectId(e))}
  : ObjectId(_id);
};
