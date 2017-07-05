'use strict';

const authenticate = require('profile/middlewares/authenticate');
const System = require('../entities/System');
const PersistenceApp = require('core/applications/persistenceApplication')(System);
const AccessApp = require('core/applications/accessApplication')(System);

module.exports = function (router) {

    router
        .get('/', authenticate(), PersistenceApp.find)

        .get('/autocomplete', authenticate(), PersistenceApp.autocomplete)

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
