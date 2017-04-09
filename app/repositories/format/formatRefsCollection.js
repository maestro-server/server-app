'use strict';

module.exports = function (_id, collection, fielder, entity={}, create=false) {

    let enc = {
        "_ref" : collection,
        '_id': _id,
    };

    enc = Object.assign(enc, entity);

    if (create)
        enc = [enc, ];

    return {[fielder]: enc};
};
