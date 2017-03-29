'use strict';

import AuthService from '../../services/authService';
import UserService from '../../services/usersService';

import authenticate from '../../middlewares/authenticate';


module.exports = function (router) {

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
