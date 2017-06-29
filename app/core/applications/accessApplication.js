'use strict';

const DAccessServices = require('core/services/AccessServices');

const hateaosTransform = require('core/applications/transforms/hateoasTransform');

const AccessApp = (Entity, AccessServices = DAccessServices) => {

    return {

        update: (req, res, next) => {

            AccessServices(Entity)
                .updateRoles(req.params.id, req.params.idu, req.body, req.user)
                .then((e) => hateaosTransform.accessSingleRoleRefs(e, req.params.id, Entity))
                .then(e => res.status(201).json(e))
                .catch(function (e) {
                    next(e);
                });
        },

        create: (req, res, next) => {

            AccessServices(Entity)
                .addRoles(req.params.id, req.body, req.user)
                .then((e) => hateaosTransform.accessSingleRoleRefs(e, req.params.id, Entity))
                .then(e => res.status(201).json(e))
                .catch(function (e) {
                    next(e);
                });
        },

        remove: (req, res, next) => {

            AccessServices(Entity)
                .deleteRoles(req.params.id, req.params.idu, req.user)
                .then(e => res.status(204).json(e))
                .catch(function (e) {
                    next(e);
                });
        }

    };
};

module.exports = AccessApp;
