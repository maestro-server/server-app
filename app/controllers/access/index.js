'use strict';

import AccessService from '../../services/accessService';


module.exports = function (router) {

    router
        .get('/', function (req, res) {

            AccessService.find(req.query)
                .then(e => res.json(e))
                .catch(function(e) {
                    next(e);
                });

        })

        .get('/:id', function (req, res) {

            AccessService.findOne(req.params.id)
                .then(e => res.json(e))
                .catch(function(e) {
                    next(e);
                });

        })

        .put('/:id', function (req, res, next) {

            AccessService.update(req.params.id, req.body)
                .then(e => res.status(201).json(e))
                .catch(function(e) {
                    next(e);
                });

        })


        .delete('/:id', function (req, res) {

            AccessService.remove(req.params.id)
                .then(e => res.status(204).json(e))
                .catch(function(e) {
                    next(e);
                });

        });


    router.post('/', function (req, res, next) {

        AccessService.create(req.body)
            .then(e => res.status(201).json(e))
            .catch(function(e) {
                next(e);
            });

    });

};
