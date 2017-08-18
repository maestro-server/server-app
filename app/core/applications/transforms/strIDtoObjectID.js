'use strict';

const _ = require('lodash');
const {ObjectId} = require('mongorito');

module.exports = function (query, keys) {

    if(!_.isEmpty(keys)) {
        _.each(keys, (e) => {
            if (query.hasOwnProperty(e)) {
                query[e] = ObjectId(query[e]);
            }
        });
    }
    return query;
};
