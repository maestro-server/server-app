'use strict';

const _ = require('lodash');
const toObjectId = require('mongorito/util/to-objectid');

module.exports = function (trans = {}) {

    if (_.has(trans, '_id'))
        trans._id = toObjectId(trans._id);

    if (_.has(trans, 'id'))
        trans.id = toObjectId(trans.id);

    return trans;

};
