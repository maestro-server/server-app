'use strict';

const authenticate = require('identity/middlewares/authenticate');

const Clients = require('../../entities/Clients');
const System = require('../../entities/System');
const Team = require('identity/entities/Teams');

const WrapperPersistenceApp = require('core/applications/wrapperPersistenceApplication')(Clients)(Team);
const WrapperPersistenceAppDefault = WrapperPersistenceApp()();

const AccessApp = require('core/applications/accessApplication');
const WrapperAccessApp = WrapperPersistenceApp(AccessApp)();

const PersistenceRelation = require('../../applications/persistenceSystem')(System);
const WrapperRelationsApp = WrapperPersistenceApp(PersistenceRelation)();

module.exports = function (router) {

    router
        .get('/teams/:id/clients', authenticate(), WrapperPersistenceAppDefault.find)

        .get('/teams/:id/clients/count', authenticate(), WrapperPersistenceAppDefault.count)

        .get('/teams/:id/clients/:idu', authenticate(), WrapperPersistenceAppDefault.findOne)

        .put('/teams/:id/clients/:idu', authenticate(), WrapperPersistenceAppDefault.update)

        .patch('/teams/:id/clients/:idu', authenticate(), WrapperPersistenceAppDefault.patch)

        .delete('/teams/:id/clients/:idu', authenticate(), WrapperPersistenceAppDefault.remove)

        .post('/teams/:id/clients', authenticate(), WrapperPersistenceAppDefault.create)

        /**
         * Roles
         */

        .post('/teams/:id/clients/:idu/roles', authenticate(), WrapperAccessApp.create)

        .put('/teams/:id/clients/:idu/roles', authenticate(), WrapperAccessApp.update)

        .put('/teams/:id/clients/:idu/roles/:ida', authenticate(), WrapperAccessApp.updateSingle)

        .delete('/teams/:id/clients/:idu/roles/:ida', authenticate(), WrapperAccessApp.remove)

        /**
         * System
         */
        .patch('/teams/:id/clients/:idu/system', authenticate(), WrapperRelationsApp.create)

        .delete('/teams/:id/clients/:idu/system', authenticate(), WrapperRelationsApp.remove);

};
