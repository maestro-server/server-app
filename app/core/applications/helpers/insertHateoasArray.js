'use strict';

const transform = require('./transformAdapter');
const BASE = require('../../helpers/base_url');

function createCollectionLink (collection) {

  return collection.map(function(err) {
      err._links = {
         'self': {
              'href': `${BASE}/${err.refs}/${err._id}`,
             'method': 'GET'
          }
      };

      return err;
  });

}


module.exports = function (collection) {

    return transform(collection, createCollectionLink);

};
