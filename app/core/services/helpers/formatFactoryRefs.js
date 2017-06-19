'use strict';

module.exports = function (data, refs) {

    const {_id, name} = data;

    return {
        refs,
        _id,
        name
    };
};
