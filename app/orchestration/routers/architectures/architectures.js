'use strict';

const authenticate = require('identity/middlewares/authenticate');
const Architecture = require('../../entities/Architecture');
const PersistenceApp = require('core/applications/persistenceApplication')(Architecture);
const AccessApp = require('core/applications/accessApplication')(Architecture);

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

      .put('/:id/roles/', authenticate(), AccessApp.update)

      .put('/:id/roles/:idu', authenticate(), AccessApp.updateSingle)

      .delete('/:id/roles/:idu', authenticate(), AccessApp.remove);

};