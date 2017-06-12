'use strict';

const UserService = require('services/usersService');
const authenticate = require('middlewares/authenticate');

const User = require('../entities/Users');

/**
 *
 * Entity to call persisntece layer
 */
const ProfilePersistenceService = require('../services/PersistenceServices');
const PersistenceApp = require('applications/persistenceApplication')(User, ProfilePersistenceService);


module.exports = function (router) {

    router
        .get('/', authenticate(), function (req, res, next) {
            req.params.id = req.user._id;

            PersistenceApp.findOne(req, res, next);
        })

        .put('/', authenticate(), function (req, res, next) {
            req.params.id = req.user._id;

            PersistenceApp.update(req, res, next);
        })

        .delete('/', authenticate(), function (req, res, next) {
            req.params.id = req.user._id;

            PersistenceApp.remove(req, res, next);
        });



};
