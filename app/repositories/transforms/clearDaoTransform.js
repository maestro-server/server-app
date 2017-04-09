'use strict';

module.exports = function (collection) {

  return new Promise((resolve) => {

    Object.keys(collection).forEach(function(key) {
        collection[key] = collection[key].get();
    });

    resolve(collection);

  });
};
