'use strict';

const transform = require('../helpers/transformAdapter');
const insertHateoasArray = require('../helpers/insertHateoasArray');
const BASE = require('../../helpers/base_url');

module.exports = function (collection, _id=false, uri=false) {

    return new Promise((resolve) => {

        const items = insertHateoasArray(collection);

        const _links = transform(_id, () => {
          return {
              '_parent': {
                  'href': `${BASE}/${uri}/${_id}`,
                  'method': 'GET'
              },
              '_root': {
                  'href': `${BASE}/${uri}`,
                  'method': 'GET'
              },
          };
        });

        const found = items.length;


        resolve({
           found,
           items,
          _links
        });

    });
};
