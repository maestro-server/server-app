'use strict';

const _ = require('lodash');

const DPersistenceServices = require('core/services/PersistenceServices');
const PersistenceApplication = require('core/applications/persistenceApplication');

const jsonParser = require('core/applications/transforms/jsonParser');
const filterHooks = require('./transforms/filterHooks');

const ApplicationServers = (Entity, PersistenceServices = DPersistenceServices) => {

    return {
      find(req, res, next) {
          const field = 'query';
          let query = _.clone(req.query);

          query = jsonParser(query, field);

          query = filterHooks(query, field, [
            {dest: 'id', source: '_id', module: 'swap'},
            {dest: 'datacenters.name', source: 'datacenters', module: 'swap'},
            {dest: 'os.base', source: 'os', module: 'swap'},
            {dest: 'environment', source: 'environment', module: 'swap'},
            {dest: 'role', source: 'role', module: 'swap'},
            {dest: 'auth.type', source: 'auth', module: 'swap'},
            {dest: 'auth.username', source: 'user', module: 'swap'}
          ]);

          Object.assign(req, {query});
          PersistenceApplication(Entity, PersistenceServices)
            .find(req, res, next);
      }
    };
};

module.exports = _.curry(ApplicationServers);
