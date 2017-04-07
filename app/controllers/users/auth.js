'use strict';

const AuthService = require('../../services/authService');

const authenticate = require('../../middlewares/authenticate');


module.exports = function (router) {

    router
        .get('/', authenticate(), function (req, res, next) {

            next(req);

        })

        .post('/', function (req, res, next) {

            AuthService
                .authenticate(req.body)
                .then(e => res.json(e))
                .catch(function (e) {
                    next(e);
                });

        });


};
