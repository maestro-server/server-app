
const insertHateoasSingle = require('./insertHateoasSingle');

module.exports = function (collection, uri) {

    Object.keys(collection).forEach(function(key) {

        collection[key] = insertHateoasSingle(collection[key], uri);
    });

    return collection;

};
