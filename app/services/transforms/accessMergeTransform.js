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


        resolve(Object.assign(trans, merge));
    });
};
