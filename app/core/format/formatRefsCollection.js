'use strict';

module.exports = function (items, refs, fielder, entity={}, create=false) {

    let enc = {
        refs
    };

    enc = Object.assign(enc, items, entity);

    if (create)
        enc = [enc, ];

    return {[fielder]: enc};
};
