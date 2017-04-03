'use strict';

import ApplicationsService from '../../services/applicationsService';

import authenticate from '../../middlewares/authenticate';

module.exports = function (router) {

    router
        .get('/', authenticate(), function (req, res, next) {

            ApplicationsService.find(req.query, req.user)
                .then(e => res.json(e))
                .catch(function(e) {
                    next(e);
                });

        })

        .get('/:id', authenticate(), function (req, res, next) {

            ApplicationsService.findOne(req.params.id, req.user)
                .then(e => res.json(e))
                .catch(function(e) {
                    next(e);
                });

        })

        .patch('/:id', authenticate(), function (req, res, next) {

            ApplicationsService.update(req.params.id, req.body, req.user)
                .then(e => res.status(202).json(e))
                .catch(function(e) {
                    next(e);
                });

        })


        .delete('/:id', authenticate(), function (req, res, next) {

            ApplicationsService.remove(req.params.id, req.user)
                .then(e => res.status(204).json(e))
                .catch(function(e) {
                    next(e);
                });

        })

        .post('/', authenticate(), function (req, res, next) {

            req.user._refs = "users";

            ApplicationsService.create(req.body, req.user)
                .then(e => res.status(201).json(e))
                .catch(function(e) {
                    next(e);
                });

        });


};
