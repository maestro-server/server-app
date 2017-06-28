'use strict';

const authenticate = require('core/middlewares/authenticate');

const User = require('profile/entities/Users');
const UserAuth = require('profile/entities/Auth');

/**
 *
 * Entity to call persisntece layer
 */
const ProfilePersistenceService = require('profile/services/PersistenceServices');
const PersistenceApp = require('core/applications/persistenceApplication')(User, ProfilePersistenceService);
const UploaderApp = require('core/applications/uploadApplication')(User);

const AuthApp = require('profile/applications/authApplication')(UserAuth);

module.exports = function (router) {

    router
        .get('/', authenticate(), PersistenceApp.find)

        .get('/autocomplete', authenticate(), PersistenceApp.autocomplete)

        .get('/upload', authenticate(), UploaderApp.uploader)

        .get('/forgot', (req, res) => {
          res.json({});
         })

        .get('/:id', authenticate(), PersistenceApp.findOne)

        .post('/', PersistenceApp.create)


        .patch('/auth/pass', authenticate(), AuthApp.updateExistPassword)

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

        .post('/auth', AuthApp.login)

        .post('/forgot', AuthApp.forgot)

        .put('/forgot/change', AuthApp.updateForgotPassword);
};
