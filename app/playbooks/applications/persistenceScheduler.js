'use strict';

const _ = require('lodash');

const DPersistenceServices = require('core/services/PersistenceServices');
const PersistenceApplication = require('core/applications/persistenceApplication');

const jsonParser = require('core/applications/transforms/jsonParser');
const filterHooks = require('inventory/applications/transforms/filterHooks');

const ApplicationSchedulers = (Entity, PersistenceServices = DPersistenceServices) => {

    return {
      find(req, res, next) {
          const field = 'query';
          let query = _.clone(req.query);

          query = jsonParser(query, field);

          query = filterHooks(query, field, [
            {dest: 'link.refs', source: 'modules', module: 'swap'}
          ]);

          Object.assign(req, {query});
          PersistenceApplication(Entity, PersistenceServices)
            .find(req, res, next);
      }
    };
};

module.exports = _.curry(ApplicationSchedulers);
