'use strict';

const UserService = require('services/usersService');
const authenticate = require('middlewares/authenticate');

const User = require('../../entities/Users');

/**
 *
 * Entity to call persisntece layer
 */
const ProfilePersistenceService = require('../../services/PersistenceServices');
const PersistenceApp = require('applications/persistenceApplication')(User, ProfilePersistenceService);

module.exports = function (router) {

    router
        .get('/', authenticate(), PersistenceApp.find)

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
