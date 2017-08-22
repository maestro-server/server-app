'use strict';

const _ = require('lodash');

const DPersistenceServices = require('core/services/PersistenceServices');
const PersistenceApplication = require('core/applications/persistenceApplication');

const jsonParser = require('core/applications/transforms/jsonParser');
const filterHooks = require('./transforms/filterHooks');

const persistenceClients = (Entity, PersistenceServices = DPersistenceServices) => {

    return {
        findClients(req, res, next) {
            const field = 'query';
            let query = _.clone(req.query);

            query = jsonParser(query, field);

            query = filterHooks(query, field, [
                {dest: 'clients.name', source: 'lclients', module: 'swap'},
                {source: 'links', module: 'upperFirst'}
            ]);

            Object.assign(req, {query});
            PersistenceApplication(Entity, PersistenceServices)
                .find(req, res, next);
        }
    };
};

module.exports = _.curry(persistenceClients);
