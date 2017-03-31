
import toObjectId from 'mongorito/util/to-objectid';
import merger from '../transforms/mergeTransform';

module.exports = function (_id, collection, fielder, entity={}, create=false) {

    let enc = {
        "_ref" : collection,
        '_id': toObjectId(_id),
    };

    enc = Object.assign(enc, entity);

    if (create)
        enc = [enc, ];

    return {[fielder]: enc};
};
