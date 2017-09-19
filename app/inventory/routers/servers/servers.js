'use strict';

const authenticate = require('identity/middlewares/authenticate');
const Servers = require('../../entities/Servers');
const PersistenceApp = require('core/applications/persistenceApplication')(Servers);
const PersistenceAppServers = require('../../applications/persistenceServers')(Servers);

const AccessApp = require('core/applications/accessApplication')(Servers);

module.exports = function (router) {

    router
        .get('/', authenticate(), PersistenceAppServers.findServers)

        .get('/:id', authenticate(), PersistenceApp.findOne)

        .put('/:id', authenticate(), PersistenceApp.update)

        .patch('/:id', authenticate(), PersistenceApp.patch)

        .delete('/:id', authenticate(), PersistenceApp.remove)

        .post('/', authenticate(), PersistenceApp.create)

        /**
         * Roles
         */
        .post('/:id/roles', authenticate(), AccessApp.create)

        .put('/:id/roles/:idu', authenticate(), AccessApp.update)

        .delete('/:id/roles/:idu', authenticate(), AccessApp.remove);
};
