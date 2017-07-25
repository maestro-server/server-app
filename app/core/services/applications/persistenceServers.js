'use strict';

const _ = require('lodash');

const DPersistenceServices = require('core/services/PersistenceServices');
const PersistenceApplication = require('core/applications/persistenceApplication');

const ApplicationServers = (Entity, PersistenceServices = DPersistenceServices) => {

    return {
      findServers(req, res, next) {

          PersistenceApplication(Entity, PersistenceServices)
            .find(req, res, next);
      }
    };
};

module.exports = _.curry(ApplicationServers);
