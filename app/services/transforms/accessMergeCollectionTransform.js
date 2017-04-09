const toObjectId = require('mongorito/util/to-objectid');

module.exports = function (ids, fielder, trans = {}) {

    return new Promise((resolve) => {

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
