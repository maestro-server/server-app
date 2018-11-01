'use strict';

const authenticate = require('identity/middlewares/authenticate');

const Graph = require('../../entities/Graph');
const PersistenceApp = require('core/applications/persistenceApplication')(Graph);
const PersistenceGraph = require('../../applications/persistenceGraph')(Graph);

const AccessApp = require('core/applications/accessApplication')(Graph);


module.exports = function (router) {

    router
        .get('/', authenticate(), PersistenceGraph.find)

        .get('/count', authenticate(), PersistenceApp.count)

        .get('/autocomplete', authenticate(), PersistenceApp.autocomplete)

        .get('/:id', authenticate(), PersistenceApp.findOne)

        .put('/:id', authenticate(), PersistenceGraph.update)

        .patch('/:id', authenticate(), PersistenceApp.patch)

        .delete('/:id', authenticate(), PersistenceApp.remove)

        .post('/:id/public', authenticate(), PersistenceGraph.createPublicToken)

        .post('/', authenticate(), PersistenceGraph.create)


        /**
         * Roles
         */
        .post('/:id/roles', authenticate(), AccessApp.create)

        .put('/:id/roles/', authenticate(), AccessApp.update)

        .put('/:id/roles/:idu', authenticate(), AccessApp.updateSingle)

        .delete('/:id/roles/:idu', authenticate(), AccessApp.remove);
};