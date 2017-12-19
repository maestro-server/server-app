'use strict';

const _ = require('lodash');
const in_maker = require('core/libs/in_maker');


const transfID = (data, key = '_id') => {
    if(_.has(data, key)) {
        const id = in_maker(_.get(data, key));
        _.set(data, key, id);
        return data;
    }

    if(_.isString(data)) {
        data = in_maker(data);
        return data;
    }

    return data;
};

const isID = (obj, relation, key = '_id') => {
    const exist = _.get(obj, relation);

    if(_.isArray(exist)) {
        const interator = obj[relation].map(e=>isID(e, '', key));
        _.set(obj, relation, interator);
        return obj;
    }

    let prefix = '';
    if(relation) {
        prefix = relation;
    }
    if(key) {
        if(!_.isEmpty(prefix)) {
            prefix = prefix + ".";
        }
        prefix = prefix + key;
    }

    return transfID(obj, prefix);
};

module.exports = function (query, keys) {

    _.each(keys, (ett) => {
        isID(query, ett);
    });

    return query;
};

module.exports.transfID = transfID;
