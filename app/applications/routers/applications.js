'use strict';

const authenticate = require('core/middlewares/authenticate');

const Application = require('../entities/Application');
const PersistenceApp = require('core/applications/persistenceApplication')(Application);
const AccessApp = require('core/applications/accessApplication')(Application);

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
