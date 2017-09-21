'use strict';

const authenticate = require('identity/middlewares/authenticate');
const Datacenter = require('../../entities/Datacenter');
const Servers = require('../../entities/Servers');

const PersistenceApp = require('core/applications/persistenceApplication')(Datacenter);
const SyncerApp = require('core/applications/relationsApplication')(Datacenter)(Servers)()();

const AccessApp = require('core/applications/accessApplication')(Datacenter);

module.exports = function (router) {

    router
        .get('/', authenticate(), PersistenceApp.find)

        .get('/:id', authenticate(), PersistenceApp.findOne)

        .put('/:id', authenticate(), PersistenceApp.update)

        .patch('/:id', authenticate(), PersistenceApp.patch)

        .delete('/:id', authenticate(), PersistenceApp.remove)

        .post('/', authenticate(), PersistenceApp.create)

        /**
         * Roles
         */
        .post('/:id/roles', authenticate(), AccessApp.create)

        .put('/:id/roles/', authenticate(), AccessApp.update)

        .put('/:id/roles/:idu', authenticate(), AccessApp.updateSingle)

        .delete('/:id/roles/:idu', authenticate(), AccessApp.remove)

        /*
        Actions
        */
        .get('/:id/servers/', authenticate(), SyncerApp.find)

        .get('/:id/servers/count', authenticate(), SyncerApp.count)

        .patch('/:id/sync_count_servers/', authenticate(), SyncerApp.syncer);
};
