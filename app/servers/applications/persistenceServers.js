'use strict';

const _ = require('lodash');

const DPersistenceServices = require('core/services/PersistenceServices');
const PersistenceApplication = require('core/applications/persistenceApplication');

const jsonParser = require('core/applications/transforms/jsonParser');
const filterHooks = require('./transforms/filterHooks');

const ApplicationServers = (Entity, PersistenceServices = DPersistenceServices) => {

    return {
      findServers(req, res, next) {
          const field = 'query';
          let query = _.clone(req.query);

          query = jsonParser(query, field);

          query = filterHooks(query, field, [
            {dest: 'dc.name', source: 'dc'},
            {dest: 'os.base', source: 'os'},
            {dest: 'environment', source: 'environment'},
            {dest: 'role', source: 'role'},
            {dest: 'auth.type', source: 'auth'},
            {dest: 'auth.username', source: 'user'}
          ]);

          Object.assign(req, {query});
          PersistenceApplication(Entity, PersistenceServices)
            .find(req, res, next);
      }
    };
};

module.exports = _.curry(ApplicationServers);
