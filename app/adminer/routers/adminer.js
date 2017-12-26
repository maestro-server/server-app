'use strict';

const authenticate = require('identity/middlewares/authenticate');
const Adminer = require('../entities/Adminer');

const PersistenceApp = require('core/applications/persistenceApplication')(Adminer);


module.exports = function (router) {

    router
        .get('/', authenticate(), PersistenceApp.find)

        .get('/:id', authenticate(), PersistenceApp.findOne)

        .patch('/:id', authenticate(), PersistenceApp.patch);
};
