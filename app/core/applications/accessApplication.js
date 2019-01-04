'use strict';

const _ = require('lodash');

const DAccessServices = require('core/services/AccessServices');

const hateaosTransform = require('core/applications/transforms/hateoasTransform');

const AccessApp = (Entity, AccessServices = DAccessServices) => {

    return {

        update: (req, res, next) => {

            const user = _.get(req, 'auth', req.user);

            AccessServices(Entity, user)
                .updateRoles(req.params.id, req.body, req.user)
                .then((e) => hateaosTransform(Entity).accessSingleRoleRefs(e, req.params.id))
                .then(e => res.status(201).json(e))
                .catch(next);
        },

        create: (req, res, next) => {

            const user = _.get(req, 'auth', req.user);

            AccessServices(Entity, user)
                .addRoles(req.params.id, req.body, req.user)
                .then((e) => hateaosTransform(Entity).accessSingleRoleRefs(e, req.params.id))
                .then(e => res.status(201).json(e))
                .catch(next);
        },

        updateSingle: (req, res, next) => {

            const user = _.get(req, 'auth', req.user);

            AccessServices(Entity, user)
                .updateSingleRoles(req.params.id, req.params.idu, req.body, req.user)
                .then((e) => hateaosTransform(Entity).accessSingleRoleRefs(e, req.params.id))
                .then(e => res.status(201).json(e))
                .catch(next);
        },

        remove: (req, res, next) => {

            const user = _.get(req, 'auth', req.user);

            AccessServices(Entity, user)
                .deleteRoles(req.params.id, req.params.idu, req.user)
                .then(e => res.status(204).json(e))
                .catch(next);
        }

    };
};

module.exports = _.curry(AccessApp);
