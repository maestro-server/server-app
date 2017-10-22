'use strict';

const _ = require('lodash');
const createLinkPagination = require('./helpers/createLinkPagination');
const factoryObjHateoas = require('./helpers/factoryObjHateoas');

const singleHT = (collection, uri) => {
    const {_id} = collection;
    const _links = factoryObjHateoas('_self', `/${uri}/${_id}`);
    return Object.assign(collection, {_links});
};


module.exports = (Entity) => {

    return {
        accessSingleRoleRefs: (collections, _id = false) => {

            return {
                items: singleHT(collections[Entity.access], _.get(collections[Entity.access], 'refs')),
                _links: Object.assign(
                    {},
                    factoryObjHateoas('_parent', `/${Entity.name}/${_id}`),
                    factoryObjHateoas('_root', `/${Entity.name}`)
                )
            };
        },

        collectionTransform: (data, count, limit = 20, page = 1) => {
            const pages = Math.ceil(count / limit);

            return {
                'found': count,
                'limit': limit,
                'total_pages': pages,
                'current_page': page,
                'items': _.map(data, (v) => singleHT(v, Entity.name)),
                '_links': createLinkPagination(Entity.name, limit, pages, page)
            };
        },

        singleTransform: (item) => {
            if (item.hasOwnProperty(Entity.access))
                item[Entity.access] = item[Entity.access].map((err) => singleHT(err, err.refs));

            return singleHT(item, Entity.name);
        }
    };
};
