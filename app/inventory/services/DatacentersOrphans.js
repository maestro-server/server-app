'use strict';

const _ = require('lodash');
const Servers = require('../entities/Servers');
const validNotFound = require('core/applications/validator/validNotFound');
const hateaosTransform = require('core/applications/transforms/hateoasTransform');

const DatacentersOrphans = (req) => (PersistenceServices) => (data) => {
    let {query, user} = req;

    query = _.defaults(query, {limit: 100}, {page: 1});
    query['dc_id'] = data['_id']
    query['datacenters.instance_id'] = {'$ne': data['tracker-server-list'] }

    const {limit, page} = query;

    return PersistenceServices(Servers)
        .find(query, user)
        .then((e) => validNotFound(e, e[1], limit, page))
        .then((e) => hateaosTransform(Servers).collectionTransform(e[0], e[1], limit, page));
};

module.exports = DatacentersOrphans;
