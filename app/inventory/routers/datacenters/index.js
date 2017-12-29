'use strict';

const authenticate = require('identity/middlewares/authenticate');

const Datacenter = require('../../entities/Datacenter');
const Team = require('identity/entities/Teams');

const WrapperPersistenceApp = require('core/applications/wrapperPersistenceApplication')(Datacenter)(Team);
const WrapperPersistenceAppDefault = WrapperPersistenceApp()();

const AccessApp = require('core/applications/accessApplication');
const WrapperAccessApp = WrapperPersistenceApp(AccessApp)();

module.exports = function (router) {

    router
        .get('/teams/:id/datacenters', authenticate(), WrapperPersistenceAppDefault.find)

        .get('/teams/:id/datacenters/count', authenticate(), WrapperPersistenceAppDefault.count)

        .get('/teams/:id/datacenters/:idu', authenticate(), WrapperPersistenceAppDefault.findOne)

        .put('/teams/:id/datacenters/:idu', authenticate(), WrapperPersistenceAppDefault.update)

        .patch('/teams/:id/datacenters/:idu', authenticate(), WrapperPersistenceAppDefault.patch)

        .delete('/teams/:id/datacenters/:idu', authenticate(), WrapperPersistenceAppDefault.remove)

        .post('/teams/:id/datacenters', authenticate(), WrapperPersistenceAppDefault.create)

        /**
         * Roles
         */

        .post('/teams/:id/datacenters/:idu/roles', authenticate(), WrapperAccessApp.create)

        .put('/teams/:id/datacenters/:idu/roles', authenticate(), WrapperAccessApp.update)

        .put('/teams/:id/datacenters/:idu/roles/:ida', authenticate(), WrapperAccessApp.updateSingle)

        .delete('/teams/:id/datacenters/:idu/roles/:ida', authenticate(), WrapperAccessApp.remove);



};
