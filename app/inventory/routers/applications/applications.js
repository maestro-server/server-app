'use strict';

const authenticate = require('identity/profile/middlewares/authenticate');
const Application = require('../../entities/Application');
const PersistenceApp = require('core/applications/persistenceApplication')(Application);
const PersistenceAppApplications = require('../../applications/persistenceApplications')(Application);
const AccessApp = require('core/applications/accessApplication')(Application);

module.exports = function (router) {

    router
        .get('/', authenticate(), PersistenceAppApplications.findApplications)

        .get('/:id', authenticate(), PersistenceApp.findOne)

        .patch('/:id', authenticate(), PersistenceApp.update)

        .delete('/:id', authenticate(), PersistenceApp.remove)

        .post('/', authenticate(), PersistenceApp.create)

        /**
         * Roles
         */
        .post('/:id/roles', authenticate(), AccessApp.create)

        .put('/:id/roles/:idu', authenticate(), AccessApp.update)

        .delete('/:id/roles/:idu', authenticate(), AccessApp.remove);
};