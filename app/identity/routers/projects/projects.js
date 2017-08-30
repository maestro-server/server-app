'use strict';

const authenticate = require('identity/middlewares/authenticate');

const Project = require('../../entities/Project');
const PersistenceApp = require('core/applications/persistenceApplication')(Project);
const AccessApp = require('core/applications/accessApplication')(Project);


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
