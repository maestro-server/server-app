'use strict';

const AuthService = require('services/authService');

const authenticate = require('middlewares/authenticate');


module.exports = function (router) {


    router
        .get('/', authenticate(), function (req, res, next) {
            next(req);
        })

        .patch('/pass', authenticate(), function (req, res, next) {

            AuthService.updateExistPassword(req.body, req.user)
                .then(e => res.status(201).json(e))
                .catch(function(e) {
                    next(e);
                });

        })

        /**
         * @api {post} /users/auth Login User
         * @apiName Auth
         * @apiGroup Auth
         *
         * @apiParam {String} username Your e-mail-address.
         * @apiParam {String} password Your password.
         *
         *
         * @apiSuccess {String} name Team name.
         * @apiSuccess {String} email Team email.
         * @apiSuccess {String} url Team url.
         * @apiSuccess {Object} members Members.
         */

        .post('/', function (req, res, next) {

            AuthService
                .authenticate(req.body)
                .then(e => res.json(e))
                .catch(function (e) {
                    next(e);
                });

        });


};
