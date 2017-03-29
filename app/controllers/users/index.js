'use strict';

import AuthService from '../../services/authService';
import UserService from '../../services/usersService';

import authenticate from '../../middlewares/authenticate';


module.exports = function (router) {

    router
        .get('/', authenticate(), function (req, res) {

            UserService.find(req.query)
                .then(e => res.json(e))
                .catch(function(e) {
                    next(e);
                });

        })

        .get('/:id', authenticate(), function (req, res) {

            UserService.findOne(req.params.id)
                .then(e => res.json(e))
                .catch(function(e) {
                    next(e);
                });

        })

        .put('/:id', authenticate(), function (req, res, next) {

            UserService.update(req.params.id, req.body)
                .then(e => res.status(201).json(e))
                .catch(function(e) {
                    next(e);
                });

        })


        .delete('/:id', authenticate(), function (req, res) {

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

        })
        .post('/auth', function (req, res, next) {

            AuthService
                .authenticate(req.body)
                .then(e => res.json(e))
                .catch(function(e) {
                    next(e);
                });

        });



};
