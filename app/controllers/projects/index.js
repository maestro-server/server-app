'use strict';

import ProjectService from '../../services/projectsService';


module.exports = function (router) {

    router
        .get('/', function (req, res) {

            ProjectService.find(req.query)
                .then(e => res.json(e))
                .catch(function(e) {
                    console.log(e)
                    next(e);
                });

        })

        .get('/:id', function (req, res) {

            ProjectService.findOne(req.params.id)
                .then(e => res.json(e))
                .catch(function(e) {
                    next(e);
                });

        })

        .put('/:id', function (req, res, next) {

            ProjectService.update(req.params.id, req.body)
                .then(e => res.status(201).json(e))
                .catch(function(e) {
                    next(e);
                });

        })


        .delete('/:id', function (req, res) {

            ProjectService.remove(req.params.id)
                .then(e => res.status(204).json(e))
                .catch(function(e) {
                    next(e);
                });

        });


    router.post('/', function (req, res, next) {

        ProjectService.create(req.body)
            .then(e => res.status(201).json(e))
            .catch(function(e) {
                next(e);
            });

    });

};
