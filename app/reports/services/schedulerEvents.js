'use strict';

const _ = require('lodash');
const Events = require('reports/entities/Event');
const validNotFound = require('core/applications/validator/validNotFound');
const {transfID} = require('core/applications/transforms/mapRelationToObjectID');
const hateaosTransform = require('core/applications/transforms/hateoasTransform');

const SchedulerEvents = (query) => (PersistenceServices) => (scheduler) => {
    const {_id} = scheduler;
    const user = transfID({_id}, '_id');

    query = _.defaults(query, {limit: 10}, {page: 1});

    const {limit, page} = query;

    return PersistenceServices(Events)
        .find(query, user)
        .then((e) => validNotFound(e, e[1], limit, page))
        .then((e) => hateaosTransform(Events).collectionTransform(e[0], e[1], limit, page));
};

module.exports = SchedulerEvents;
