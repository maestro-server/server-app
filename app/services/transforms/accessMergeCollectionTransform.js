const toObjectId = require('mongorito/util/to-objectid');

const Access = require('../../entities/accessRole');

module.exports = function (ids, fielder, trans = {}, access=Access.ROLE_READ) {

    return new Promise((resolve, reject) => {

        if (trans.hasOwnProperty('_id'))
            trans._id = toObjectId(trans._id);

        if (!Array.isArray(ids))
            throw new ReferenceError("Isn’t array");

        ids.map((e) => toObjectId(e));

        const merge = {
            [fielder]:  {
                $in: ids
            }};


        resolve(Object.assign(trans, merge));
    });
};

//{ 'owner._id': { $in: [ObjectId('58dfe24bba33b91f2b1171fd')] }}
