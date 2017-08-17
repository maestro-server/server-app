'use strict';

const _ = require('lodash');

const PersistenceServices = require('core/services/PersistenceServices');
const PersistenceSystem = require('../services/PersistenceServices');
const notExist = require('core/applications/validator/validNotExist');

const persistenceSystem = (Entity) => (IEntity) => {

    return {
      insertApp(req, res, next) {

        PersistenceServices(Entity)
            .findOne(req.params.id, req.user)
            .then(notExist)
            .then((e) => {
              const ids = _.isArray(_.get(req, 'body.id')) ? req.body.id : [];
              const system = _.pick(e, 'name', '_id');

              PersistenceSystem(IEntity)
                .addList(ids, {system}, req.user);
            })
            .then(e => res.json(e))
            .catch(next);
      }
    };
};

module.exports = _.curry(persistenceSystem);
