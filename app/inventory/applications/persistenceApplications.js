'use strict';

const _ = require('lodash');

const DPersistenceServices = require('core/services/PersistenceServices');
const PersistenceApplication = require('core/applications/persistenceApplication');

const jsonParser = require('core/applications/transforms/jsonParser');
const filterHooks = require('core/applications/transforms/filterHooks');

const persistenceApplications = (Entity, PersistenceServices = DPersistenceServices) => {

    return {
        findApplications(req, res, next) {
            const field = 'query';
            let query = _.clone(req.query);

            query = jsonParser(query, field);

            query = filterHooks(query, field, [
                {dest: 'datacenters.name', source: 'datacenters', module: 'swap'},
                {dest: 'system.name', source: 'lsystem', module: 'swap'},
                {dest: 'family', source: 'family', module: 'swap'},
                {dest: 'role.role', source: 'role', module: 'swap'},
                {source: 'language', module: 'upperFirst'},
                {source: 'provider', module: 'upperFirst'},
                {source: 'environment', module: 'upperFirst'}
            ]);

            Object.assign(req, {query});
            PersistenceApplication(Entity, PersistenceServices)
                .find(req, res, next);
        }
    };
};

module.exports = _.curry(persistenceApplications);
