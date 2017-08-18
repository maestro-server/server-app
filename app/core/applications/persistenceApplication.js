'use strict';

const _ = require('lodash');

const DPersistenceServices = require('core/services/PersistenceServices');

const hateaosTransform = require('core/applications/transforms/hateoasTransform');

const validNotFound = require('core/applications/validator/validNotFound');
const notExist = require('core/applications/validator/validNotExist');
const Access = require('core/entities/accessRole');

const aclRoles = require('./transforms/aclRoles');
const jsonParser = require('./transforms/jsonParser');
const strIDtoObjectID = require('./transforms/strIDtoObjectID');


const PersistenceApp = (Entity, PersistenceServices = DPersistenceServices) => {

    return {

        find (req, res, next) {

            let {query, user} = req;
            query =  strIDtoObjectID(query, Entity.mapRelations)
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

            PersistenceServices(Entity)
                .update(req.params.id, req.body, req.user)
                .then(e => res.status(202).json(e))
                .catch(next);
        },

        create (req, res, next) {

            _.defaults(req.body, Entity.defaults || {});

            const bodyWithOwner = Object.assign(
                {},
                req.body,
                aclRoles(req.user, Entity, Access.ROLE_ADMIN)
            );

            PersistenceServices(Entity)
                .create(bodyWithOwner)
                .then(hateaosTransform(Entity).singleTransform)
                .then(e => res.status(201).json(e))
                .catch(next);

        },

        remove (req, res, next) {

            PersistenceServices(Entity)
                .remove(req.params.id, req.user)
                .then(e => res.status(204).json(e))
                .catch(next);
        }

    };
};

module.exports = _.curry(PersistenceApp);
