'use strict';

const authenticate = require('identity/middlewares/authenticate');

const Connections = require('../../entities/Connections');
const Team = require('identity/entities/Teams');

const PersistenceConnection = require('../../applications/persistenceConnection');
const WrapperPersistenceApp = require('core/applications/wrapperPersistenceApplication')(Connections)(Team);
const WrapperPersistenceAppDefault = WrapperPersistenceApp()();

const AccessApp = require('core/applications/accessApplication');
const WrapperAccessApp = WrapperPersistenceApp(AccessApp)();

module.exports = function (router) {

    router
        /**
         * @api {get} /teams/:id/connections/ ca. List Conn for Team
         * @apiName GetConnTeam
         * @apiGroup Teams
         */
        .get('/teams/:id/connections', authenticate(), WrapperPersistenceAppDefault.find)
        /**
         * @api {get} /teams/:id/connections/count cb. Count Conn for Team
         * @apiName GetCountListConnTeam
         * @apiGroup Teams
         */
        .get('/teams/:id/connections/count', authenticate(), WrapperPersistenceAppDefault.count)
        /**
         * @api {get} /teams/:id/connections/:idu cc. Single Conn for Team
         * @apiName GetSingleListConnTeam
         * @apiGroup Teams
         */
        .get('/teams/:id/connections/:idu', authenticate(), WrapperPersistenceAppDefault.findOne)
        /**
         * @api {put} /teams/:id/connections/:idu cd. Update all Conn for Team
         * @apiName UpdateSingleListConnTeam
         * @apiGroup Teams
         */
        .put('/teams/:id/connections/:idu', authenticate(), WrapperPersistenceAppDefault.update)
        /**
         * @api {patch} /teams/:id/connections/:idu ce. Partial Conn for Team
         * @apiName GetPartialSingleListConnTeam
         * @apiGroup Teams
         */
        .patch('/teams/:id/connections/:idu', authenticate(), WrapperPersistenceAppDefault.patch)
        /**
         * @api {delete} /teams/:id/connections/:idu cf. Single Conn for Team
         * @apiName DeleteSingleListConnTeam
         * @apiGroup Teams
         */
        .delete('/teams/:id/connections/:idu', authenticate(), WrapperPersistenceApp(PersistenceConnection)().remove)
        /**
         * @api {post} /teams/:id/connections/ ag. Create Conn for Team
         * @apiName PostSingleListConnTeam
         * @apiGroup Teams
         */
        .post('/teams/:id/connections', authenticate(), WrapperPersistenceApp(PersistenceConnection)().create)
        /**
         * @api {post} /teams/:id/connections/:idu/task/:command ag. Execute a command
         * @apiName PostSingleListConnTeamCommand
         * @apiGroup Teams
         */
        .put('/teams/:id/connections/:idu/task/:command', authenticate(), WrapperPersistenceApp(PersistenceConnection)('task').update)

        /**
         * Roles
         */
        /**
         * @api {post} /teams/:id/connections/:idu/roles ch. Create access role
         * @apiName GetSingleListConnTeam
         * @apiGroup Teams
         */
        .post('/teams/:id/connections/:idu/roles', authenticate(), WrapperAccessApp.create)
        /**
         * @api {put} /teams/:id/connections/:idu/roles ci. Update all access role
         * @apiName GetSingleListConnTeam
         * @apiGroup Teams
         */
        .put('/teams/:id/connections/:idu/roles', authenticate(), WrapperAccessApp.update)
        /**
         * @api {put} /teams/:id/connections/:idu/roles/:ida cj. Update access role
         * @apiName GetSingleListConnTeam
         * @apiGroup Teams
         */
        .put('/teams/:id/connections/:idu/roles/:ida', authenticate(), WrapperAccessApp.updateSingle)
        /**
         * @api {delete} /teams/:id/connections/:idu/roles/:ida cl. Delete access role
         * @apiName GetSingleListConnTeam
         * @apiGroup Teams
         */
        .delete('/teams/:id/connections/:idu/roles/:ida', authenticate(), WrapperAccessApp.remove);
};
