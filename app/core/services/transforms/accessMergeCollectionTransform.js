'use strict';

const {ObjectId} = require('mongorito');

module.exports = function (ids, fielder, trans = {}) {

    return new Promise((resolve) => {

        if (trans.hasOwnProperty('_id'))
            trans._id = ObjectId(trans._id);

        if (!Array.isArray(ids))
            throw new ReferenceError("Isn’t array");

        ids.map((e) => ObjectId(e));

        const merge = {
            [fielder]:  {
                $in: ids
            }};


        resolve(Object.assign(trans, merge));
    });
};
