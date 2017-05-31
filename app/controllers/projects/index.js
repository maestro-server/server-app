'use strict';

const ProjectService = require('../../services/projectsService');

const authenticate = require('../../middlewares/authenticate');


module.exports = function (router) {

    router
        .get('/', authenticate(), function (req, res, next) {

            ProjectService.find(req.query, req.user)
                .then(e => res.json(e))
                .catch(function(e) {
                    next(e);
                });

        })

        .get('/:id', authenticate(), function (req, res, next) {

            ProjectService.findOne(req.params.id, req.user)
                .then(e => res.json(e))
                .catch(function(e) {
                    next(e);
                });

        })

        .patch('/:id', authenticate(), function (req, res, next) {

            ProjectService.update(req.params.id, req.body, req.user)
                .then(e => res.status(202).json(e))
                .catch(function(e) {
                    next(e);
                });

        })


        .delete('/:id', authenticate(), function (req, res, next) {

            ProjectService.remove(req.params.id, req.user)
                .then(e => res.status(204).json(e))
                .catch(function(e) {
                    next(e);
                });

        });


    router.post('/', authenticate(), function (req, res, next) {

        ProjectService.create(req.body, req.user)
            .then(e => res.status(201).json(e))
            .catch(function(e) {
                next(e);
            });

    });

};
