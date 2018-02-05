'use strict';

const authenticate = require('identity/middlewares/authenticate');
const Reports = require('../../entities/Report');


const PersistenceReport = require('../../applications/persistenceReports')(Reports);
const PersistenceApp = require('core/applications/persistenceApplication')(Reports);
const AccessApp = require('core/applications/accessApplication')(Reports);

module.exports = function (router) {

    router
        .get('/', authenticate(), PersistenceApp.find)

        .get('/count', authenticate(), PersistenceApp.count)

        .get('/:id', authenticate(), PersistenceApp.findOne)

        .post('/', authenticate(), PersistenceReport.create)

        .put('/:id', authenticate(), PersistenceApp.update)

        .patch('/:id', authenticate(), PersistenceApp.patch)

        .delete('/:id', authenticate(), PersistenceReport.remove)

        /**
         * Roles
         */
        .post('/:id/roles', authenticate(), AccessApp.create)

        .put('/:id/roles/', authenticate(), AccessApp.update)

        .put('/:id/roles/:idu', authenticate(), AccessApp.updateSingle)

        .delete('/:id/roles/:idu', authenticate(), AccessApp.remove);
};
