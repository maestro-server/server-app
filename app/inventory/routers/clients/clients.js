'use strict';

const authenticate = require('identity/middlewares/authenticate');

const Client = require('../../entities/Clients');
const System = require('../../entities/System');

const PersistenceApp = require('core/applications/persistenceApplication')(Client);
const PersistenceSystem = require('../../applications/persistenceSystem')(Client)(System);

const AccessApp = require('core/applications/accessApplication')(Client);

module.exports = function (router) {

    router
    .get('/', authenticate(), PersistenceApp.find)

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
     * System
     */
    .patch('/:id/system', authenticate(), PersistenceSystem.insertApp)

    .delete('/:id/system', authenticate(), PersistenceSystem.removeApp);
};
