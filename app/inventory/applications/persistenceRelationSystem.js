'use strict';

const _ = require('lodash');

const PersistenceServices = require('core/services/PersistenceServices');
const PersistenceRelationSystem = require('../services/PersistenceServices');
const notExist = require('core/applications/validator/validNotExist');
const hateaosTransform = require('core/applications/transforms/hateoasTransform');

const persistenceSystem = (IEntity) => (Entity) => {

    return {
        create(req, res, next) {
            PersistenceServices(Entity)
                .findOne(req.params.id, req.user)
                .then(notExist)
                .then((e) => {
                    const ids = _.isArray(_.get(req, 'body.id')) ? req.body.id : [];
                    const entitier = _.pick(e, 'name', '_id', 'family');
                    const data = {[Entity.name]: entitier};

                    return PersistenceRelationSystem(IEntity)
                        .addList(ids, data, req.user);
                })
                .then(hateaosTransform(Entity).singleTransform)
                .then(e => res.status(202).json(e))
                .catch(next);
        },

        remove(req, res, next) {

            PersistenceServices(Entity)
                .findOne(req.params.id, req.user)
                .then(notExist)
                .then((e) => {
                    const ids = _.isArray(_.get(req, 'body.id')) ? req.body.id : [];
                    const entitier = _.pick(e, 'name', '_id');
                    const data = {[Entity.name]: entitier};

                    return PersistenceRelationSystem(IEntity)
                        .removeList(ids, data, req.user);
                })
                .then(e => res.status(204).json(e))
                .catch(next);
        }
    };
};

module.exports = _.curry(persistenceSystem);
