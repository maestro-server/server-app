'use strict';

const ArchitecturesService = require('../../services/architecturesService');

const authenticate = require('../../middlewares/authenticate');

module.exports = function (router) {

    router
        .get('/', authenticate(), function (req, res, next) {

            ArchitecturesService.find(req.query, req.user)
                .then(e => res.json(e))
                .catch(function(e) {
                    next(e);
                });

        })

        .get('/:id', authenticate(), function (req, res, next) {

            ArchitecturesService.findOne(req.params.id, req.user)
                .then(e => res.json(e))
                .catch(function(e) {
                    next(e);
                });

        })

        .patch('/:id', authenticate(), function (req, res, next) {

            ArchitecturesService.update(req.params.id, req.body, req.user)
                .then(e => res.status(202).json(e))
                .catch(function(e) {
                    next(e);
                });

        })


        .delete('/:id', authenticate(), function (req, res, next) {

            ArchitecturesService.remove(req.params.id, req.user)
                .then(e => res.status(204).json(e))
                .catch(function(e) {
                    next(e);
                });

        })

        .post('/', authenticate(), function (req, res, next) {

            req.user._refs = "users";

            ArchitecturesService.create(req.body, req.user)
                .then(e => res.status(201).json(e))
                .catch(function(e) {
                    next(e);
                });

        })

        /**
         * Roles
         */

        .post('/:id/roles', authenticate(), function (req, res, next) {

            ArchitecturesService.addRoles(req.params.id, req.body, req.user)
                .then(e => res.status(201).json(e))
                .catch(function (e) {
                    next(e);
                });
        })

        .patch('/:id/roles/:idu', authenticate(), function (req, res, next) {

            ArchitecturesService.updateRoles(req.params.id, req.params.idu, req.body, req.user)
                .then(e => res.status(201).json(e))
                .catch(function (e) {
                    next(e);
                });
        })

        .delete('/:id/roles/:idu', authenticate(), function (req, res, next) {

            ArchitecturesService.deleteRoles(req.params.id, req.params.idu, req.user)
                .then(e => res.status(204).json(e))
                .catch(function (e) {
                    next(e);
                });

        });



};
