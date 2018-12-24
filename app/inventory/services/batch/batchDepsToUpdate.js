'use strict';

const _ = require('lodash');
const in_maker = require('core/libs/in_maker');
const Access = require('core/entities/accessRole');
const {transfID} = require('core/applications/transforms/mapRelationToObjectID');
const accessMergeTransform = require('core/services/transforms/accessMergeTransform');


const depsToUpdate = (data, owner, acc='access') => {
    let tmp = [];
    _.forEach(data, (value, key) => {
        const deps = value.map(e=>transfID(e, '_id'));

        const item = {'$set':
                {'deps': deps}
        };

        const _id = in_maker(key);
        const filter = accessMergeTransform(owner, acc, {_id}, Access.ROLE_WRITE);

        tmp.push({updateOne: {'filter': filter, 'update': item}});
    });

    return tmp;
};


module.exports = depsToUpdate;
