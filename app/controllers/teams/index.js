'use strict';

import TeamService from '../../services/teamsService';


module.exports = function (router) {

    router
        .get('/', function (req, res) {

            TeamService.find(req.query)
                .then(e => res.json(e))
                .catch(function(e) {
                    next(e);
                });

        })

        .get('/:id', function (req, res) {

            TeamService.findOne(req.params.id)
                .then(e => res.json(e))
                .catch(function(e) {
                    next(e);
                });

        })

        .put('/:id', function (req, res, next) {

            TeamService.update(req.params.id, req.body)
                .then(e => res.status(201).json(e))
                .catch(function(e) {
                    next(e);
                });

        })


        .delete('/:id', function (req, res) {

            TeamService.remove(req.params.id)
                .then(e => res.status(204).json(e))
                .catch(function(e) {
                    next(e);
                });

        });


    router.post('/', function (req, res, next) {

        TeamService.create(req.body)
            .then(e => res.status(201).json(e))
            .catch(function(e) {
                next(e);
            });

    });

};
