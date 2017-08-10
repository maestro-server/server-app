'use strict';

const authenticate = require('identity/profile/middlewares/authenticate');
const Adminer = require('../entities/Adminer');

const AdminerPersistenceService = require('adminer/services/PersistenceServices');
const PersistenceApp = require('core/applications/persistenceApplication')(Adminer, AdminerPersistenceService);


module.exports = function (router) {

    router
        .get('/', authenticate(), PersistenceApp.find)
        .get('/:id', authenticate(), PersistenceApp.findOne);
};
