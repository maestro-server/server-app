'use strict';

import TeamService from '../../services/teamsService';

import authenticate from '../../middlewares/authenticate';

module.exports = function (router) {

    router
        .get('/', authenticate(), function (req, res) {

            TeamService.find(req.query, req.user)
                .then(e => res.json(e))
                .catch(function(e) {
                    next(e);
                });

        })

        .get('/:id', authenticate(), function (req, res) {

            TeamService.findOne(req.params.id)
                .then(e => res.json(e))
                .catch(function(e) {
                    next(e);
                });

        })

        .put('/:id', authenticate(), function (req, res, next) {

            TeamService.update(req.params.id, req.body)
                .then(e => res.status(201).json(e))
                .catch(function(e) {
                    next(e);
                });

        })


        .delete('/:id', authenticate(), function (req, res) {

            TeamService.remove(req.params.id)
                .then(e => res.status(204).json(e))
                .catch(function(e) {
                    next(e);
                });

        });


    router.post('/', authenticate(), function (req, res, next) {

        TeamService.create(req.body, req.user)
            .then(e => res.status(201).json(e))
            .catch(function(e) {
                next(e);
            });

    });

};
