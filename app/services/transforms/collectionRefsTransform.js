

import createLinkPagination from '../helpers/createLinkPagination';
import insertHateoasCollection from '../helpers/insertHateoasCollection';

import BASE from '../../helpers/base_url';

module.exports = function (collection, _id=null, uri=null, parent={}) {

    return new Promise((resolve, reject) => {

        collection.map(function(err) {
            err._links = {
               'self': {
                    'href': `${BASE}/${err._ref}/${err._id}`,
                   'method': 'GET'
                }
            };

            return err;
        });

        const link = {
            '_parent': {
                'href': `${BASE}/${uri}/${_id}`,
                'method': 'GET'
            },
            '_root': {
                'href': `${BASE}/${uri}`,
                'method': 'GET'
            },
        };

        const result = {
            'found': collection.length,
            'items': collection,
            '_links':  link
        };

        resolve(
            Object.assign(parent, result)
        );


    });
};
