
import transform from '../helpers/transformAdapter';
import insertHateoasArray from '../helpers/insertHateoasArray';
import BASE from '../../helpers/base_url';

module.exports = function (collection, _id=false, uri=false) {

    return new Promise((resolve, reject) => {

        const items = insertHateoasArray(collection);

        const _links = transform(_id, (e) => {
          return {
              '_parent': {
                  'href': `${BASE}/${uri}/${_id}`,
                  'method': 'GET'
              },
              '_root': {
                  'href': `${BASE}/${uri}`,
                  'method': 'GET'
              },
          }
        });

        const found = items.length;


        resolve({
           found,
           items,
          _links
        });

    });
};
