'use strict';

const _ = require('lodash');

const DAccessServices = require('core/services/AccessServices');

const hateaosTransform = require('core/applications/transforms/hateoasTransform');

const AccessApp = (Entity, AccessServices = DAccessServices) => {

    return {

        update: (req, res, next) => {

            AccessServices(Entity)
                .updateRoles(req.params.id, req.params.idu, req.body, req.user)
                .then((e) => hateaosTransform(Entity).accessSingleRoleRefs(e, req.params.id))
                .then(e => res.status(201).json(e))
                .catch(next);
        },

        create: (req, res, next) => {

            AccessServices(Entity)
                .addRoles(req.params.id, req.body, req.user)
                .then((e) => hateaosTransform(Entity).accessSingleRoleRefs(e, req.params.id))
                .then(e => res.status(201).json(e))
                .catch(next);
        },

        remove: (req, res, next) => {

            AccessServices(Entity)
                .deleteRoles(req.params.id, req.params.idu, req.user)
                .then(e => res.status(204).json(e))
                .catch(next);
        }

    };
};

module.exports = _.curry(AccessApp);
