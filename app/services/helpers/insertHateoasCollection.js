
import BASE from '../../helpers/base_url';

module.exports = function (collection, uri) {

    Object.keys(collection).forEach(function(key) {

        const _id = collection[key].get('_id');

        const _link = {
            '_self': {
                'method': 'GET',
                'href': `${BASE}/${uri}/${_id}`
            }
        };

        collection[key].set('_link', _link);

    });

    return collection;

};
