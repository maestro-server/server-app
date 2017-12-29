'use strict';

const authenticate = require('identity/middlewares/authenticate');

const System = require('../../entities/System');
const Application = require('../../entities/Application');
const Team = require('identity/entities/Teams');

const PersistenceAppClients = require('../../applications/persistenceClients');
const WrapperPersistenceApp = require('core/applications/wrapperPersistenceApplication')(System)(Team);
const WrapperPersistenceAppDefault = WrapperPersistenceApp()();

const AccessApp = require('core/applications/accessApplication');
const WrapperAccessApp = WrapperPersistenceApp(AccessApp)();

const PersistenceRelation = require('../../applications/persistenceSystem')(Application);
const WrapperRelationsApp = WrapperPersistenceApp(PersistenceRelation)();

module.exports = function (router) {

    router
        .get('/teams/:id/system', authenticate(), WrapperPersistenceApp(PersistenceAppClients)('findClients').find)

        .get('/teams/:id/system/count', authenticate(), WrapperPersistenceAppDefault.count)

        .get('/teams/:id/system/:idu', authenticate(), WrapperPersistenceAppDefault.findOne)

        .put('/teams/:id/system/:idu', authenticate(), WrapperPersistenceAppDefault.update)

        .patch('/teams/:id/system/:idu', authenticate(), WrapperPersistenceAppDefault.patch)

        .delete('/teams/:id/system/:idu', authenticate(), WrapperPersistenceAppDefault.remove)

        .post('/teams/:id/system', authenticate(), WrapperPersistenceAppDefault.create)

        /**
         * Roles
         */

        .post('/teams/:id/system/:idu/roles', authenticate(), WrapperAccessApp.create)

        .put('/teams/:id/system/:idu/roles', authenticate(), WrapperAccessApp.update)

        .put('/teams/:id/system/:idu/roles/:ida', authenticate(), WrapperAccessApp.updateSingle)

        .delete('/teams/:id/system/:idu/roles/:ida', authenticate(), WrapperAccessApp.remove)

        /**
         * Applications
         */
        .patch('/teams/:id/system/:idu/applications', authenticate(), WrapperRelationsApp.create)

        .delete('/teams/:id/system/:idu/applications', authenticate(), WrapperRelationsApp.remove);

};
