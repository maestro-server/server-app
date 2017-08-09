'use strict';
const _ = require('lodash');
const {ObjectId} = require('mongorito');
const Access = require('core/entities/accessRole');

function makeAccess(owner, fielder, access) {
    const {_id} = owner;

    if (!_id)
        return false;

    if(!fielder)
          return {};

    const newId = ObjectId(_id);

    return {
        [fielder]: {
            $elemMatch: {
                '_id': newId,
                'role': {$gte: access}
            }
        }
    };
}

module.exports = function (owner, fielder, trans = {}, access = Access.ROLE_READ) {
    let merge = false;

    if (trans.hasOwnProperty('_id')) {
       const {_id} = trans;
       trans._id = _.isArray(_id)
       ? {$in: _.map(_id, e=>ObjectId(e))}
       : ObjectId(_id);
    }

    if (Array.isArray(owner)) {
        const roles = owner.map((e) => makeAccess(e, fielder, access));
        merge = {$or: roles};
    } else {
        merge = makeAccess(owner, fielder, access);
    }

    return Object.assign({}, trans, merge);
};

module.exports.makeAccess = makeAccess;
