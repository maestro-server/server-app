import toObjectId from 'mongorito/util/to-objectid';

import Access from '../../entities/accessRole';

module.exports = function (owner, fielder, trans = {}, access=Access.ROLE_READ) {

    return new Promise((resolve, reject) => {

        if (trans.hasOwnProperty('_id'))
            trans._id = toObjectId(trans._id);


        let {_id} = owner;

        if (!_id)
            reject();

        let newId = toObjectId(_id);

        const merge = {
            [fielder]:  {
                $elemMatch: {
                    '_id': newId,
                    'role': {$gte: access}
                }
            }};

        const merge2 = {
            [fielder]:  {
                $elemMatch: {
                    '_id': toObjectId("58def13c3d9a10a39f8a8901"),
                    'role': {$gte: access}
                }
            }};

            const a = {$or:[merge, merge2]};

        resolve(Object.assign(trans, a));
    });
};
