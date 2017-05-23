'use strict';

const {ObjectId} = require('mongorito');

module.exports = function (_id, fielder) {

    let enc = {
        '_id': ObjectId(_id),
    };


    return {[fielder]: enc};
};
