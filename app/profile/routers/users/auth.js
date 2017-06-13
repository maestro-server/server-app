'use strict';

const AuthService = require('core/services/authService');

const authenticate = require('core/middlewares/authenticate');

const UserAuth = require('profile/entities/Auth');

/**
 *
 * Entity to call persisntece layer
 */
const AuthApp = require('profile/applications/authApplication')(UserAuth);

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

        .post('/', AuthApp.login);


};
