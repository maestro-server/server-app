'use strict';

const authenticate = require('profile/middlewares/authenticate');
const User = require('../entities/Users');
const ProfilePersistenceService = require('profile/services/PersistenceServices');
const PersistenceApp = require('core/applications/persistenceApplication')(User, ProfilePersistenceService);

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
