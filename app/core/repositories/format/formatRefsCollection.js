'use strict';

module.exports = function (items, _ref, fielder, entity={}, create=false) {

    let enc = {
        _ref
    };

    enc = Object.assign(enc, items, entity);

    if (create)
        enc = [enc, ];

    return {[fielder]: enc};
};
