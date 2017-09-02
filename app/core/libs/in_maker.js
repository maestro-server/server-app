"use strict";

const _ = require('lodash');
const {ObjectId} = require('mongorito');
const NotFoundError = require('core/errors/factoryError')('NotFoundError');


const intObject = (str) => {
  if(ObjectId.isValid(str)) {
    return ObjectId(str);
  }
  throw new NotFoundError(`Indentity ${str} not exist`);
};

module.exports = (_id, key = '$in') => {
  if(_.has(_id, key)) {
    return _id;
  }

  return _.isArray(_id)
  ? {[key]: _.map(_id, e=>intObject(e))}
  : intObject(_id);
};
