'use strict';

const authenticate = require('identity/middlewares/authenticate');

const Client = require('../../entities/Clients');
const System = require('../../entities/System');

const PersistenceApp = require('core/applications/persistenceApplication')(Client);
const PersistenceRelation = require('../../applications/persistenceSystem')(System)(Client);

const AccessApp = require('core/applications/accessApplication')(Client);

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

    /**
     * System
     */
    .patch('/:id/system', authenticate(), PersistenceRelation.create)

    .delete('/:id/system', authenticate(), PersistenceRelation.remove);
};
