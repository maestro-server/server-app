'use strict';

const UserService = require('core/services/usersService');
const authenticate = require('core/middlewares/authenticate');

const User = require('profile/entities/Users');

/**
 *
 * Entity to call persisntece layer
 */
const ProfilePersistenceService = require('profile/services/PersistenceServices');
const PersistenceApp = require('core/applications/persistenceApplication')(User, ProfilePersistenceService);

module.exports = function (router) {

    router
        .get('/', authenticate(), PersistenceApp.find)

        .get('/autocomplete', authenticate(), PersistenceApp.autocomplete)

        .get('/upload', authenticate(), function (req, res, next) {

            UserService.uploadAvatar(req.query, req.user)
                .then(e => res.json(e))
                .catch(function(e) {
                    next(e);
                });
        })

        .get('/:id', authenticate(), PersistenceApp.findOne)

        .post('/', PersistenceApp.create);
};
