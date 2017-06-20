'use strict';

const transform = require('./helpers/transformAdapter');
const insertHateoasArray = require('./helpers/insertHateoasArray');
const BASE = require('./helpers/base_url');

const createLinkPagination = require('./helpers/createLinkPagination');
const insertHateoasCollection = require('./helpers/insertHateoasCollection');
const insertHateoasSingle = require('./helpers/insertHateoasSingle');

module.exports.collectionRefsTransform = function (collection, _id=false, Entity={}) {

        const items = insertHateoasArray(collection);

        const _links = transform(_id, () => {
          return {
              '_parent': {
                  'href': `${BASE}/${Entity.name}/${_id}`,
                  'method': 'GET'
              },
              '_root': {
                  'href': `${BASE}/${Entity.name}`,
                  'method': 'GET'
              },
          };
        });

        const found = items.length;

        return {found, items, _links};
};


module.exports.collectionTransform = function (data, count, Entity={}, limit=20, page=1) {
    const pages = Math.ceil(count/limit);

    const trans = {
        'found': count,
        'limit': limit,
        'total_pages': pages,
        'current_page': page,
        'items': insertHateoasCollection(data, Entity.name),
        '_links': createLinkPagination(Entity.name, limit, pages, page)
    };

    return (trans);
};


module.exports.singleTransform = function (item, Entity) {

  if (item.hasOwnProperty(Entity.access))
      item[Entity.access] = insertHateoasArray(item[Entity.access]);

  return insertHateoasSingle(item, Entity.name);
};
