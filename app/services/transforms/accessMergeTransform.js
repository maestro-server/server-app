'use strict';

const toObjectId = require('mongorito/util/to-objectid');

const Access = require('../../entities/accessRole');

function makeAccess (owner, fielder, access) {
  const {_id} = owner;

  if (!_id)
    return false;

  const newId = toObjectId(_id);

  return {
    [fielder]:  {
        $elemMatch: {
            '_id': newId,
            'role': {$gte: access}
        }
    }};
}

module.exports = function (owner, fielder, trans = {}, access=Access.ROLE_READ) {

    return new Promise((resolve, reject) => {
        let merge = false;

        if (trans.hasOwnProperty('_id'))
            trans._id = toObjectId(trans._id);

        if (Array.isArray(owner)) {
          const roles = owner.map((e) => makeAccess(e, fielder, access));
          merge = {$or:roles};
        } else {
          merge = makeAccess(owner, fielder, access);
        }

        if (!merge)
            reject();

        resolve(Object.assign(trans, merge));
    });
};
