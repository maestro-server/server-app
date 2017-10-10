'use strict';

const authenticate = require('identity/middlewares/authenticate');
const System = require('../../entities/System');
const Application = require('../../entities/Application');

const PersistenceApp = require('core/applications/persistenceApplication')(System);
const PersistenceRelation = require('../../applications/persistenceSystem')(Application)(System);
const PersistenceAppSystem = require('../../applications/persistenceClients')(System);

const AccessApp = require('core/applications/accessApplication')(System);

module.exports = function (router) {

    router
        .get('/', authenticate(), PersistenceAppSystem.findClients)

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

        .delete('/:id/roles/:idu', authenticate(), AccessApp.remove)

        /**
         * Applications
         */
        .patch('/:id/applications', authenticate(), PersistenceRelation.create)

        .delete('/:id/applications', authenticate(), PersistenceRelation.remove);
};
