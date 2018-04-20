'use strict';

const authenticate = require('identity/middlewares/authenticate');
const Scheduler = require('../../entities/Scheduler');

const PersistenceApp = require('core/applications/persistenceApplication')(Scheduler);
const PersistenceAppScheduler = require('../../applications/persistenceScheduler')(Scheduler);

const AccessApp = require('core/applications/accessApplication')(Scheduler);

module.exports = function (router) {

    router
        .get('/', authenticate(), PersistenceAppScheduler.find)

        .get('/count', authenticate(), PersistenceApp.count)

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

        .delete('/:id/roles/:idu', authenticate(), AccessApp.remove);
};
