'use strict';

const authenticate = require('identity/middlewares/authenticate');
const Services = require('../entities/Services');

const PersistenceApp = require('core/applications/persistenceApplication')(Services);


module.exports = function (router) {

    router
        .get('/', authenticate(), PersistenceApp.find)

        .get('/:id', authenticate(), PersistenceApp.findOne)

        .put('/:id', authenticate(), PersistenceApp.update)

        .patch('/:id', authenticate(), PersistenceApp.patch)

        .delete('/:id', authenticate(), PersistenceApp.remove)

        .post('/', authenticate(), PersistenceApp.create);
};
