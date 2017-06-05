'use strict';

module.exports = function (collection) {

    Object.keys(collection).forEach(function (key) {
        collection[key] = collection[key].get();
    });

    return collection;
};
