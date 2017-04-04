'use strict';

import UserService from '../../services/usersService';

import authenticate from '../../middlewares/authenticate';


module.exports = function (router) {

    router
        .get('/', authenticate(), function (req, res, next) {

            UserService.find(req.query, req.user)
                .then(e => res.json(e))
                .catch(function(e) {
                    next(e);
                });

        })

        .get('/:id', function (req, res, next) {

            UserService.publicFindOne(req.params.id)
                .then(e => res.json(e))
                .catch(function (e) {
                    next(e);
                });

        })

        .post('/', function (req, res, next) {

            UserService.create(req.body)
                .then(e => res.status(201).json(e))
                .catch(function (e) {
                    next(e);
                });

        });


};
