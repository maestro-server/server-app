'use strict';

const _ = require('lodash');
const {ObjectId} = require('mongorito');

module.exports = function (trans = {}) {

    if (_.has(trans, '_id'))
        trans._id = ObjectId(trans._id);

    if (_.has(trans, 'id'))
        trans.id = ObjectId(trans.id);

    return trans;

};
