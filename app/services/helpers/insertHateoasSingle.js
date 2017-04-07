
const BASE = require('../../helpers/base_url');

module.exports = function (collection, uri) {

      const {_id} = collection;

      const _link = {
          '_self': {
              'method': 'GET',
              'href': `${BASE}/${uri}/${_id}`
          }
      };

      Object.assign(collection, {_link});


    return collection;

};
