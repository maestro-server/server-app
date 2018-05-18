'use strict';

const _ = require('lodash');
const Servers = require('../entities/Servers');
const hateaosTransform = require('core/applications/transforms/hateoasTransform');

const DatacentersOrphans = (req) => (PersistenceServices) => (data) => {
    let {query, user} = req;
    let filter = [];

    if (data['tracker-server-list'] && _.isArray(data['tracker-server-list'])) {
        filter = {$nin: data['tracker-server-list']};
    }

    query = _.defaults(query, {limit: 100}, {page: 1});
    query['dc_id'] = data['_id'];
    query['datacenters.instance_id'] = filter;

    const {limit, page} = query;

    return PersistenceServices(Servers)
        .find(query, user)
        .then((e) => hateaosTransform(Servers).collectionTransform(e[0], e[1], limit, page));


};

module.exports = DatacentersOrphans;
