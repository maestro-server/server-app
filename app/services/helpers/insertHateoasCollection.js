
import BASE from '../../helpers/base_url';
import insertHateoasSingle from './insertHateoasSingle';

module.exports = function (collection, uri) {

    Object.keys(collection).forEach(function(key) {

        collection[key] = insertHateoasSingle(collection[key], uri);
    });

    return collection;

};
