'use strict';

const authenticate = require('identity/middlewares/authenticate');
const User = require('../../entities/Users');
const ProfilePersistenceService = require('identity/services/PersistenceServices');
const PersistenceApp = require('core/applications/persistenceApplication')(User, ProfilePersistenceService);

module.exports = function (router) {

    router
        .get('/', authenticate(), function (req, res, next) {
            req.params.id = req.user._id;

            PersistenceApp.findOne(req, res, next);
        })

        .patch('/', authenticate(), function (req, res, next) {
            req.params.id = req.user._id;

            PersistenceApp.patch(req, res, next);
        })

        .delete('/', authenticate(), function (req, res, next) {
            req.params.id = req.user._id;

            PersistenceApp.remove(req, res, next);
        });



};
