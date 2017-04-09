'use strict';

module.exports = function (data, _refs) {

    const {_id, name} = data;

    return {
        _refs,
        _id,
        name
    };
};
