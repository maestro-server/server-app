'use strict';

const _ = require('lodash');

const DPersistenceServices = require('core/services/PersistenceServices');
const PersistenceApplication = require('core/applications/persistenceApplication');

const jsonParser = require('core/applications/transforms/jsonParser');
const filterHooks = require('./transforms/filterHooks');

const persistenceApplications = (Entity, PersistenceServices = DPersistenceServices) => {

    return {
      findApplications(req, res, next) {
          const field = 'query';
          let query = _.clone(req.query);

          query = jsonParser(query, field);

          query = filterHooks(query, field, [
            {dest: 'system.name', source: 'lsystem'}
          ]);

          console.log(query);

          Object.assign(req, {query});
          PersistenceApplication(Entity, PersistenceServices)
            .find(req, res, next);
      }
    };
};

module.exports = _.curry(persistenceApplications);
