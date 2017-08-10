'use strict';

const authenticate = require('identity/profile/middlewares/authenticate');
const Datacenter = require('../../entities/Datacenter');
const PersistenceApp = require('core/applications/persistenceApplication')(Datacenter);
const AccessApp = require('core/applications/accessApplication')(Datacenter);

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

        .delete('/:id/roles/:idu', authenticate(), AccessApp.remove);
};
