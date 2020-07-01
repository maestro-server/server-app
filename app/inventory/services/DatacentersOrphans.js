'use strict';

const _ = require('lodash');
const Servers = require('../entities/Servers');
const hateaosTransform = require('core/applications/transforms/hateoasTransform');



const DatacentersOrphans = (req) => (PersistenceServices) => (data) => {
    let {query, user} = req;

    query = _.defaults(query, {limit: 100}, {page: 1});
    query['datacenters._id'] = data['_id'];
    query['accountant'] = {$exists: false};

    const {limit, page} = query;

    return PersistenceServices(Servers)
        .find(query, user)
        .then((e) => hateaosTransform(Servers).collectionTransform(e[0], e[1], limit, page));
};

module.exports = DatacentersOrphans;
