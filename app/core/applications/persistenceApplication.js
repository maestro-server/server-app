'use strict';

const _ = require('lodash');

const DPersistenceServices = require('core/services/PersistenceServices');

const refsTransform = require('core/applications/transforms/refsTransform');
const singleTransform = require('core/applications/transforms/singleTransform');

const validNotFound = require('core/applications/validator/validNotFound');
const collectionTransform = require('core/applications/transforms/collectionTransform');

const formatRole = require('core/format/formatFirstRole');
const Access = require('core/entities/accessRole');

const PersistenceApp = (Entity, PersistenceServices = DPersistenceServices) => {

    return {

        find (req, res, next) {

            let {query, user} = req;
            query = _.defaults(query, {limit: 20}, {page: 1});
            const {limit, page} = query;


            PersistenceServices(Entity)
                .find(query, user)
                .then((e) => {
                    return validNotFound(e, e[1], limit, page);
                })
                .then((e) => {
                    return collectionTransform(e[0], e[1], Entity.name, limit, page);
                })
                .then(e => res.json(e))
                .catch(function (e) {
                    next(e);
                });
        },

        findOne (req, res, next) {

            PersistenceServices(Entity)
                .findOne(req.params.id, req.user)
                .then((e) => {
                    return refsTransform(e, Entity.access);
                })
                .then(e => res.json(e))
                .catch(function (e) {
                    next(e);
                });
        },

        autocomplete (req, res, next) {

            PersistenceServices(Entity)
                .autocomplete(req.query, req.user)
                .then((e) => {
                    return collectionTransform(e[0], e[1]);
                })
                .then(e => res.json(e))
                .catch(function (e) {
                    next(e);
                });

        },

        update (req, res, next) {

            PersistenceServices(Entity)
                .update(req.params.id, req.body, req.user)
                .then(e => res.status(202).json(e))
                .catch(function (e) {
                    next(e);
                });
        },

        create (req, res, next) {
            let {user, body} = req;

            user = _.defaults(user, {'refs': "users"});

            const owner = _.pick(user, 'name', 'email', '_id', 'refs');


            if (Entity.access) {
                body = _.merge(
                    body,
                    {owner},
                    formatRole(owner, Access.ROLE_ADMIN, Entity.access)
                );
            }

            PersistenceServices(Entity)
                .create(body)
                .then((e) => {
                    return refsTransform(e, Entity.access);
                })
                .then((e) => {
                    return singleTransform(e, Entity.name);
                })
                .then(e => res.status(201).json(e))
                .catch(function (e) {
                    next(e);
                });

        },

        remove (req, res, next) {

            PersistenceServices(Entity)
                .remove(req.params.id, req.user)
                .then(e => res.status(204).json(e))
                .catch(function (e) {
                    next(e);
                });
        }

    };
};

module.exports = PersistenceApp;
