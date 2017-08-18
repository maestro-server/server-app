'use strict';

const _ = require('lodash');

const PersistenceServices = require('core/services/PersistenceServices');
const PersistenceSystem = require('../services/PersistenceServices');
const notExist = require('core/applications/validator/validNotExist');
const hateaosTransform = require('core/applications/transforms/hateoasTransform');

const persistenceSystem = (Entity) => (IEntity) => {

    return {
        insertApp(req, res, next) {

            PersistenceServices(Entity)
                .findOne(req.params.id, req.user)
                .then(notExist)
                .then((e) => {
                    const ids = _.isArray(_.get(req, 'body.id')) ? req.body.id : [];
                    const system = _.pick(e, 'name', '_id');

                    return PersistenceSystem(IEntity)
                        .addList(ids, {system}, req.user);
                })
                .then(hateaosTransform(Entity).singleTransform)
                .then(e => res.status(202).json(e))
                .catch(next);
        },

        removeApp(req, res, next) {

            PersistenceServices(Entity)
                .findOne(req.params.id, req.user)
                .then(notExist)
                .then((e) => {
                    const ids = _.isArray(_.get(req, 'body.id')) ? req.body.id : [];
                    const system = _.pick(e, 'name', '_id');

                    return PersistenceSystem(IEntity)
                        .removeList(ids, {system}, req.user);
                })
                .then(e => res.status(204).json(e))
                .catch(next);
        }
    };
};

module.exports = _.curry(persistenceSystem);