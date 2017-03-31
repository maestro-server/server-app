
import toObjectId from 'mongorito/util/to-objectid';

module.exports = function (_id, fielder) {

    let enc = {
        '_id': toObjectId(_id),
    };


    return {[fielder]: enc};
};
