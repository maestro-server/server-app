'use strict';

const Access = require('core/entities/accessRole');
const in_maker = require('core/libs/in_maker');

function makeAccess(owner, fielder, access) {
    const {_id} = owner;

    if (!_id)
        return false;

    if(!fielder)
          return {};

    const newId = in_maker(_id);

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
       trans._id = in_maker(_id);
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
