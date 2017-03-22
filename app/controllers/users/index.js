'use strict';

import UserService from '../../services/usersService';


module.exports = function (router) {

    router
        .get('/', function (req, res) {

            UserService.find(req.query)
                .then(e => res.json(e))
                .catch(function(e) {
                    console.log(e)
                    next(e);
                });

        })

        .get('/:id', function (req, res) {

            UserService.findOne(req.params.id)
                .then(e => res.json(e))
                .catch(function(e) {
                    next(e);
                });

        })

        .put('/:id', function (req, res, next) {

            UserService.update(req.params.id, req.body)
                .then(e => res.status(201).json(e))
                .catch(function(e) {
                    next(e);
                });

        })


        .delete('/:id', function (req, res) {

            UserService.remove(req.params.id)
                .then(e => res.status(204).json(e))
                .catch(function(e) {
                    next(e);
                });

        });


    router.post('/', function (req, res, next) {

        UserService.create(req.body)
            .then(e => res.status(201).json(e))
            .catch(function(e) {
                next(e);
            });

    });

};
