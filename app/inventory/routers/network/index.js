'use strict';

const authenticate = require('identity/middlewares/authenticate');

const Networks = require('../../entities/Networks');
const Team = require('identity/entities/Teams');

const WrapperPersistenceApp = require('core/applications/wrapperPersistenceApplication')(Networks)(Team);
const WrapperPersistenceAppDefault = WrapperPersistenceApp()();

const AccessApp = require('core/applications/accessApplication');
const WrapperAccessApp = WrapperPersistenceApp(AccessApp)();

module.exports = function (router) {

    router
        .get('/teams/:id/network', authenticate(), WrapperPersistenceApp()().find)

        .get('/teams/:id/network/count', authenticate(), WrapperPersistenceAppDefault.count)

        .get('/teams/:id/network/:idu', authenticate(), WrapperPersistenceAppDefault.findOne)

        .put('/teams/:id/network/:idu', authenticate(), WrapperPersistenceAppDefault.update)

        .patch('/teams/:id/network/:idu', authenticate(), WrapperPersistenceAppDefault.patch)

        .delete('/teams/:id/network/:idu', authenticate(), WrapperPersistenceAppDefault.remove)

        .post('/teams/:id/network', authenticate(), WrapperPersistenceAppDefault.create)

        /**
         * Roles
         */

        .post('/teams/:id/network/:idu/roles', authenticate(), WrapperAccessApp.create)

        .put('/teams/:id/network/:idu/roles', authenticate(), WrapperAccessApp.update)

        .put('/teams/:id/network/:idu/roles/:ida', authenticate(), WrapperAccessApp.updateSingle)

        .delete('/teams/:id/network/:idu/roles/:ida', authenticate(), WrapperAccessApp.remove);

};
