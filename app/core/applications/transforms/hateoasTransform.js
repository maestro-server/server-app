'use strict';

const _ = require('lodash');
const BASE = require('./helpers/base_url');
const createLinkPagination = require('./helpers/createLinkPagination');

const factoryObjHateoas = require('./helpers/factoryObjHateoas');

const singleHT = (collection, uri) => {
    const {_id} = collection;
    const _links = factoryObjHateoas('_self', `${BASE}/${uri}/${_id}`);
    return _.merge(collection, {_links});
};

module.exports.accessSingleRoleRefs = function (collections, _id = false, Entity = {}) {

    return {
        items: singleHT(collections[Entity.access], _.get(collections[Entity.access], 'refs')),
        _links: _.merge(
            factoryObjHateoas('_parent', `${BASE}/${Entity.name}/${_id}`),
            factoryObjHateoas('_root', `${BASE}/${Entity.name}`)
        )
    };
};

module.exports.collectionTransform = function (data, count, Entity = {}, limit = 20, page = 1) {
    const pages = Math.ceil(count / limit);

    return {
        'found': count,
        'limit': limit,
        'total_pages': pages,
        'current_page': page,
        'items': _.map(data, (v) => singleHT(v, Entity.name)),
        '_links': createLinkPagination(Entity.name, limit, pages, page)
    };
};


module.exports.singleTransform = function (item, Entity) {
    if (item.hasOwnProperty(Entity.access))
        item[Entity.access] = item[Entity.access].map((err) => singleHT(err, err.refs));

    return singleHT(item, Entity.name);
};
