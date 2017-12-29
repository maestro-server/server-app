'use strict';

const authenticate = require('identity/middlewares/authenticate');

const Servers = require('../../entities/Servers');
const Team = require('identity/entities/Teams');

const PersistenceAppServers = require('../../applications/persistenceServers');
const WrapperPersistenceApp = require('core/applications/wrapperPersistenceApplication')(Servers)(Team);
const WrapperPersistenceAppDefault = WrapperPersistenceApp()();

const AccessApp = require('core/applications/accessApplication');
const WrapperAccessApp = WrapperPersistenceApp(AccessApp)();



module.exports = function (router) {

    router
        .get('/teams/:id/servers', authenticate(), WrapperPersistenceApp(PersistenceAppServers)('findServers').find)

        .get('/teams/:id/servers/count', authenticate(), WrapperPersistenceAppDefault.count)

        .get('/teams/:id/servers/:idu', authenticate(), WrapperPersistenceAppDefault.findOne)

        .put('/teams/:id/servers/:idu', authenticate(), WrapperPersistenceAppDefault.update)

        .patch('/teams/:id/servers/:idu', authenticate(), WrapperPersistenceAppDefault.patch)

        .delete('/teams/:id/servers/:idu', authenticate(), WrapperPersistenceAppDefault.remove)

        .post('/teams/:id/servers', authenticate(), WrapperPersistenceAppDefault.create)

        /**
         * Roles
         */

        .post('/teams/:id/servers/:idu/roles', authenticate(), WrapperAccessApp.create)

        .put('/teams/:id/servers/:idu/roles', authenticate(), WrapperAccessApp.update)

        .put('/teams/:id/servers/:idu/roles/:ida', authenticate(), WrapperAccessApp.updateSingle)

        .delete('/teams/:id/servers/:idu/roles/:ida', authenticate(), WrapperAccessApp.remove);

};
