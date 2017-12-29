'use strict';

const authenticate = require('identity/middlewares/authenticate');

const Flavors = require('../../entities/Flavors');
const Team = require('identity/entities/Teams');

const WrapperPersistenceApp = require('core/applications/wrapperPersistenceApplication')(Flavors)(Team);
const WrapperPersistenceAppDefault = WrapperPersistenceApp()();

module.exports = function (router) {

    router
        .get('/teams/:id/flavors', authenticate(), WrapperPersistenceApp()().find)

        .get('/teams/:id/flavors/count', authenticate(), WrapperPersistenceAppDefault.count)

        .get('/teams/:id/flavors/:idu', authenticate(), WrapperPersistenceAppDefault.findOne)

        .put('/teams/:id/flavors/:idu', authenticate(), WrapperPersistenceAppDefault.update)

        .patch('/teams/:id/flavors/:idu', authenticate(), WrapperPersistenceAppDefault.patch)

        .delete('/teams/:id/flavors/:idu', authenticate(), WrapperPersistenceAppDefault.remove)

        .post('/teams/:id/flavors', authenticate(), WrapperPersistenceAppDefault.create);
};
