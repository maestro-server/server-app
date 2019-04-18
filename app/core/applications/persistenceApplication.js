'use strict';

const _ = require('lodash');

const DPersistenceServices = require('core/services/PersistenceServices');

const hateaosTransform = require('core/applications/transforms/hateoasTransform');

const validNotFound = require('core/applications/validator/validNotFound');
const notExist = require('core/applications/validator/validNotExist');
const Access = require('core/entities/accessRole');

const aclRoles = require('core/applications/transforms/aclRoles');
const jsonParser = require('./transforms/jsonParser');
const mapRelationToObjectID = require('./transforms/mapRelationToObjectID');
const {transfID} = require('core/applications/transforms/mapRelationToObjectID');

const PersistenceApp = (Entity, PersistenceServices = DPersistenceServices) => {

    return {

        find (req, res, next) {

            let {query, user} = req;
            query =  mapRelationToObjectID(query, Entity.mapRelations);
            query = _.defaults(query, {limit: 20}, {page: 1});
            query = jsonParser(query, 'query');

            const {limit, page} = query;

            PersistenceServices(Entity)
                .find(query, user)
                .then((e) => validNotFound(e, e[1], limit, page))
                .then((e) => hateaosTransform(Entity).collectionTransform(e[0], e[1], limit, page))
                .then(e => res.json(e))
                .catch(next);
        },

        count (req, res, next) {

            let {query, user} = req;
            query =  transfID(query, Entity.mapRelations);
            query = jsonParser(query, 'query');

            PersistenceServices(Entity)
                .count(query, user)
                .then(count => res.json({count}))
                .catch(next);
        },

        findOne (req, res, next) {

            PersistenceServices(Entity)
                .findOne(req.params.id, req.user)
                .then(notExist)
                .then(hateaosTransform(Entity).singleTransform)
                .then(e => res.json(e))
                .catch(next);
        },

        autocomplete (req, res, next) {
            const {query} = req;

            if (query.hasOwnProperty('complete')) {
                const newQuery = {name: {$regex: query.complete, '$options': 'i'}};

                const newReq = Object.assign({},
                    req,
                    {query: newQuery}
                );

                PersistenceApp(Entity)
                    .find(newReq, res, next);
                return;
            }

            next();
        },

        update (req, res, next) {

            _.defaults(req.body, Entity.defaults || {});

            const bodyWithOwner = Object.assign(
                {},
                mapRelationToObjectID(req.body, Entity.mapRelations)
            );

            const user = _.get(req, 'auth', req.user);

            PersistenceServices(Entity, user)
                .update(req.params.id, bodyWithOwner, req.user)
                .then(e => res.status(202).json(e))
                .catch(next);
        },

        patch (req, res, next) {

            _.defaults(req.body, Entity.defaults || {});

            const bodyWithOwner = Object.assign(
                {},
                mapRelationToObjectID(req.body, Entity.mapRelations)
            );

            const user = _.get(req, 'auth', req.user);

            PersistenceServices(Entity, user)
                .patch(req.params.id, bodyWithOwner, req.user)
                .then(e => res.status(202).json(e))
                .catch(next);
        },

        create (req, res, next) {
            _.defaults(req.body, Entity.defaults || {});

            const bodyWithOwner = Object.assign(
                {},
                mapRelationToObjectID(req.body, Entity.mapRelations),
                aclRoles(req.user, Entity, Access.ROLE_ADMIN)
            );

            const user = _.get(req, 'auth', req.user);

            PersistenceServices(Entity, user)
                .create(bodyWithOwner)
                .then(hateaosTransform(Entity).singleTransform)
                .then(e => res.status(201).json(e))
                .catch(next);

        },

        remove (req, res, next) {

            const user = _.get(req, 'auth', req.user);

            PersistenceServices(Entity, user)
                .remove(req.params.id, req.user)
                .then(e => res.status(204).json(e))
                .catch(next);
        }

    };
};

module.exports = _.curry(PersistenceApp);
