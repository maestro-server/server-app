const toObjectId = require('mongorito/util/to-objectid');

module.exports = function (trans = {}) {

    if (trans.hasOwnProperty('_id'))
        trans._id = toObjectId(trans._id);

    if (trans.hasOwnProperty('id'))
        trans.id = toObjectId(trans.id);

    return trans;

};
