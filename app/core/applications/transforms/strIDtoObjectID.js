'use strict';

const _ = require('lodash');
const {ObjectId} = require('mongorito');


const transfID = (data, key) => {
    if(_.has(data, key)) {
        const id = ObjectId(_.get(data, key));
        _.set(data, key, id);
    }

    return data;
};

const isID = (obj, relation, key = '_id') => {
    const exist = _.get(obj, relation);

    if(_.isArray(exist)) {
        return obj[relation].map(e=>isID(e, '', key));
    }

    obj = transfID(obj, [relation, key]);
    obj = transfID(obj, key);
    obj = transfID(obj, `${relation}.${key}`);


    return obj;
};

module.exports = function (query, keys) {

    _.each(keys, (ett) => {
        isID(query, ett);
    });

    return query;
};

module.exports.transfID = transfID;
