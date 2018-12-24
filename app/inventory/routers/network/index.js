'use strict';

const authenticate = require('identity/middlewares/authenticate');

const Networks = require('../../entities/Networks');
const Team = require('identity/entities/Teams');

const PersistenceAppServers = require('../../applications/persistenceServers');
const WrapperPersistenceApp = require('core/applications/wrapperPersistenceApplication')(Networks)(Team);
const WrapperPersistenceAppDefault = WrapperPersistenceApp()();

const PersistenceAudit = require('core/applications/persistenceAudit');
const WrappeAuditApp = WrapperPersistenceApp(PersistenceAudit)();

const AccessApp = require('core/applications/accessApplication');
const WrapperAccessApp = WrapperPersistenceApp(AccessApp)();

module.exports = function (router) {

    router
    /**
     * @api {get} /teams/:id/network na. List Network for Team
     * @apiName GetListNetwork
     * @apiGroup Teams
     * @apiDescription Use for teams scope, have be all actions, params and option in /network,
     *
     * @apiParam (Param) {String} id Team unique ID.
     * @apiParam (Param) {String} idu Network unique ID.
     */
        .get('/teams/:id/network', authenticate(), WrapperPersistenceApp(PersistenceAppServers)().find)
        /**
         * @api {get} /teams/:id/network/count nb. Count Network for Team
         * @apiName GetCountListNetworkTeam
         * @apiGroup Teams
         */
        .get('/teams/:id/network/count', authenticate(), WrapperPersistenceAppDefault.count)
        /**
         * @api {get} /teams/:id/network/:idu nc. Single Network for Team
         * @apiName GetSingleListNetworkTeam
         * @apiGroup Teams
         */
        .get('/teams/:id/network/:idu', authenticate(), WrapperPersistenceAppDefault.findOne)
        /**
         * @api {put} /teams/:id/network/:idu nd. Update all Network for Team
         * @apiName UpdateSingleListNetworkTeam
         * @apiGroup Teams
         */
        .put('/teams/:id/network/:idu', authenticate(), WrapperPersistenceAppDefault.update)
        /**
         * @api {patch} /teams/:id/network/:idu ne. Partial Network for Team
         * @apiName GetPartialSingleListNetworkTeam
         * @apiGroup Teams
         */
        .patch('/teams/:id/network/:idu', authenticate(), WrapperPersistenceAppDefault.patch)
        /**
         * @api {delete} /teams/:id/network/:idu nf. Single Network for Team
         * @apiName DeleteSingleListNetworkTeam
         * @apiGroup Teams
         */
        .delete('/teams/:id/network/:idu', authenticate(), WrapperPersistenceAppDefault.remove)
        /**
         * @api {post} /teams/:id/network/ ng. Create Network for Team
         * @apiName PostSingleListNetworkTeam
         * @apiGroup Teams
         */
        .post('/teams/:id/network', authenticate(), WrapperPersistenceAppDefault.create)

        /**
         * @api {get} /teams/:id/network/:idu/audit nh. Get changed history
         * @apiName GetNetworkAuditTeam
         * @apiGroup Teams
         */
        .get('/teams/:id/network/:idu/audit', authenticate(), WrappeAuditApp.find)

        /**
         * Roles
         */
        /**
         * @api {post} /teams/:id/network/:idu/roles ni. Create access role
         * @apiName GetSingleListTeam
         * @apiGroup Teams
         */
        .post('/teams/:id/network/:idu/roles', authenticate(), WrapperAccessApp.create)
        /**
         * @api {put} /teams/:id/network/:idu/roles nj. Update all access role
         * @apiName GetSingleListNetworkTeam
         * @apiGroup Teams
         */
        .put('/teams/:id/network/:idu/roles', authenticate(), WrapperAccessApp.update)
        /**
         * @api {put} /teams/:id/network/:idu/roles/:ida njl. Update access role
         * @apiName GetSingleListNetworkTeam
         * @apiGroup Teams
         */
        .put('/teams/:id/network/:idu/roles/:ida', authenticate(), WrapperAccessApp.updateSingle)
        /**
         * @api {delete} /teams/:id/network/:idu/roles/:ida nm. Delete access role
         * @apiName GetSingleListNetworkTeam
         * @apiGroup Teams
         */
        .delete('/teams/:id/network/:idu/roles/:ida', authenticate(), WrapperAccessApp.remove);

};
