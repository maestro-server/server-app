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
    /**
     * @api {get} /teams/:id/servers sa. List Servers for Team
     * @apiName GetListServers
     * @apiGroup Teams
     * @apiDescription Use for teams scope, have be all actions, params and option in /servers,
     *
     * @apiParam (Param) {String} id Team unique ID.
     * @apiParam (Param) {String} idu Server unique ID.
     */
        .get('/teams/:id/servers', authenticate(), WrapperPersistenceApp(PersistenceAppServers)().find)
        /**
         * @api {get} /teams/:id/servers/count sb. Count Servers for Team
         * @apiName GetCountListServersTeam
         * @apiGroup Teams
         */
        .get('/teams/:id/servers/count', authenticate(), WrapperPersistenceAppDefault.count)
        /**
         * @api {get} /teams/:id/servers/:idu sc. Single Servers for Team
         * @apiName GetSingleListServersTeam
         * @apiGroup Teams
         */
        .get('/teams/:id/servers/:idu', authenticate(), WrapperPersistenceAppDefault.findOne)
        /**
         * @api {put} /teams/:id/servers/:idu sd. Update all Servers for Team
         * @apiName UpdateSingleListServersTeam
         * @apiGroup Teams
         */
        .put('/teams/:id/servers/:idu', authenticate(), WrapperPersistenceApp(PersistenceAppServers)().update)
        /**
         * @api {patch} /teams/:id/servers/:idu se. Partial Servers for Team
         * @apiName GetPartialSingleListServersTeam
         * @apiGroup Teams
         */
        .patch('/teams/:id/servers/:idu', authenticate(), WrapperPersistenceApp(PersistenceAppServers)().patch)
        /**
         * @api {delete} /teams/:id/servers/:idu sf. Single Servers for Team
         * @apiName DeleteSingleListServersTeam
         * @apiGroup Teams
         */
        .delete('/teams/:id/servers/:idu', authenticate(), WrapperPersistenceAppDefault.remove)
        /**
         * @api {post} /teams/:id/servers/ sg. Create Servers for Team
         * @apiName PostSingleListServersTeam
         * @apiGroup Teams
         */
        .post('/teams/:id/servers', authenticate(), WrapperPersistenceAppDefault.create)

        /**
         * Roles
         */
        /**
         * @api {post} /teams/:id/servers/:idu/roles sh. Create access role
         * @apiName GetSingleListServersTeam
         * @apiGroup Teams
         */
        .post('/teams/:id/servers/:idu/roles', authenticate(), WrapperAccessApp.create)
        /**
         * @api {put} /teams/:id/servers/:idu/roles si. Update all access role
         * @apiName GetSingleListServersTeam
         * @apiGroup Teams
         */
        .put('/teams/:id/servers/:idu/roles', authenticate(), WrapperAccessApp.update)
        /**
         * @api {put} /teams/:id/servers/:idu/roles/:ida sj. Update access role
         * @apiName GetSingleListServersTeam
         * @apiGroup Teams
         */
        .put('/teams/:id/servers/:idu/roles/:ida', authenticate(), WrapperAccessApp.updateSingle)
        /**
         * @api {delete} /teams/:id/servers/:idu/roles/:ida sl. Delete access role
         * @apiName GetSingleListServersTeam
         * @apiGroup Teams
         */
        .delete('/teams/:id/servers/:idu/roles/:ida', authenticate(), WrapperAccessApp.remove);

};
