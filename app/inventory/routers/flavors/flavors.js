'use strict';

const authenticate = require('identity/middlewares/authenticate');
const Flavors = require('../../entities/Flavors');
const PersistenceApp = require('core/applications/persistenceApplication')(Flavors);
const AccessApp = require('core/applications/accessApplication')(Flavors);

module.exports = function (router) {

    router
        .get('/', authenticate(), PersistenceApp.find)

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
