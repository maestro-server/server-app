'use strict';

const authenticate = require('identity/profile/middlewares/authenticate');
const System = require('../../entities/System');
const Application = require('../../entities/Application');

const PersistenceApp = require('core/applications/persistenceApplication')(System);
const PersistenceSystem = require('../../applications/persistenceSystem')(System)(Application);
const PersistenceAppSystem = require('../../applications/persistenceClients')(System);

const AccessApp = require('core/applications/accessApplication')(System);

module.exports = function (router) {

    router
        .get('/', authenticate(), PersistenceAppSystem.findClients)

        .get('/:id', authenticate(), PersistenceApp.findOne)

        .patch('/:id', authenticate(), PersistenceApp.update)

        .delete('/:id', authenticate(), PersistenceApp.remove)

        .post('/', authenticate(), PersistenceApp.create)

        /**
         * Roles
         */
        .post('/:id/roles', authenticate(), AccessApp.create)

        .put('/:id/roles/:idu', authenticate(), AccessApp.update)

        .delete('/:id/roles/:idu', authenticate(), AccessApp.remove)

        /**
         * Applications
         */
        .patch('/:id/applications', authenticate(), PersistenceSystem.insertApp)

        .delete('/:id/applications', authenticate(), PersistenceSystem.removeApp);
};
