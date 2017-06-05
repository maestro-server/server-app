'use strict';

const {ObjectId} = require('mongorito');
const Access = require('entities/accessRole');

function makeAccess(owner, fielder, access) {
    const {_id} = owner;

    if (!_id)
        return false;

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

    if (trans.hasOwnProperty('_id'))
        trans._id = ObjectId(trans._id);

    if (Array.isArray(owner)) {
        const roles = owner.map((e) => makeAccess(e, fielder, access));
        merge = {$or: roles};
    } else {
        merge = makeAccess(owner, fielder, access);
    }

    if (!merge)
        reject();

    return Object.assign(trans, merge);
};
