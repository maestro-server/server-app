'use strict';

const authenticate = require('identity/middlewares/authenticate');

const Datacenter = require('../../entities/Datacenter');
const Servers = require('../../entities/Servers');
const Team = require('identity/entities/Teams');

const PersistenceDC = require('../../applications/persistenceDatacenters');
const WrapperPersistenceApp = require('core/applications/wrapperPersistenceApplication')(Datacenter)(Team);
const WrapperPersistenceAppDefault = WrapperPersistenceApp()();

const PersistenceAudit = require('core/applications/persistenceAudit');
const WrappeAuditApp = WrapperPersistenceApp(PersistenceAudit)();

const AccessApp = require('core/applications/accessApplication');
const WrapperAccessApp = WrapperPersistenceApp(AccessApp)();

const SyncerApp = require('core/applications/relationsApplication')()()(Servers);
const WrapperSyncerApp = WrapperPersistenceApp(SyncerApp);

module.exports = function (router) {

    router
    /**
     * @api {get} /teams/:id/datacenters da. List DCs for Team
     * @apiName GetListDatacenter
     * @apiGroup Teams
     * @apiDescription Use for teams scope, have be all actions, params and option in /datacenters,
     *
     * @apiParam (Param) {String} id Team unique ID.
     * @apiParam (Param) {String} idu Datacenter unique ID.
     */
        .get('/teams/:id/datacenters', authenticate(), WrapperPersistenceAppDefault.find)
        /**
         * @api {get} /teams/:id/datacenters/count db. Count Dcs for Team
         * @apiName GetCountListDcsTeam
         * @apiGroup Teams
         */
        .get('/teams/:id/datacenters/count', authenticate(), WrapperPersistenceAppDefault.count)
        /**
         * @api {get} /teams/:id/datacenters/:idu dc. Single Dcs for Team
         * @apiName GetSingleListDcsTeam
         * @apiGroup Teams
         */
        .get('/teams/:id/datacenters/:idu', authenticate(), WrapperPersistenceAppDefault.findOne)
        /**
         * @api {get} /teams/:id/datacenters/:idu/orphans dc. List of orphans servers
         * @apiName GetSingleOrphansListDcsTeam
         * @apiGroup Teams
         */
        .get('/teams/:id/datacenters/:idu/orphans', authenticate(), WrapperPersistenceApp(PersistenceDC)('findOrphans').find)
        /**
         * @api {put} /teams/:id/datacenters/:idu dd. Update all Dcs for Team
         * @apiName UpdateSingleListTeam
         * @apiGroup Teams
         */
        .put('/teams/:id/datacenters/:idu', authenticate(), WrapperPersistenceAppDefault.update)
        /**
         * @api {patch} /teams/:id/datacenters/:idu de. Partial Dcs for Team
         * @apiName GetPartialSingleListDcsTeam
         * @apiGroup Teams
         */
        .patch('/teams/:id/datacenters/:idu', authenticate(), WrapperPersistenceAppDefault.patch)
        /**
         * @api {delete} /teams/:id/datacenters/:idu df. Single Dcs for Team
         * @apiName DeleteSingleListDcsTeam
         * @apiGroup Teams
         */
        .delete('/teams/:id/datacenters/:idu', authenticate(), WrapperPersistenceAppDefault.remove)
        /**
         * @api {post} /teams/:id/datacenters/ dg. Create Dcs for Team
         * @apiName PostSingleListDcsTeam
         * @apiGroup Teams
         */
        .post('/teams/:id/datacenters', authenticate(), WrapperPersistenceAppDefault.create)

        /**
         * @api {get} /teams/:id/datacenters/:idu/audit dh. Get changed history
         * @apiName GetDatacentersAuditTeam
         * @apiGroup Teams
         */
        .get('/teams/:id/datacenters/:idu/audit', authenticate(), WrappeAuditApp.find)

        /**
         * Roles
         */
        /**
         * @api {post} /teams/:id/datacenters/:idu/roles di. Create access role
         * @apiName GetSingleListDcsTeam
         * @apiGroup Teams
         */
        .post('/teams/:id/datacenters/:idu/roles', authenticate(), WrapperAccessApp.create)
        /**
         * @api {put} /teams/:id/datacenters/:idu/roles dj. Update all access role
         * @apiName GetSingleListDcsTeam
         * @apiGroup Teams
         */
        .put('/teams/:id/datacenters/:idu/roles', authenticate(), WrapperAccessApp.update)
        /**
         * @api {put} /teams/:id/datacenters/:idu/roles/:ida dl. Update access role
         * @apiName GetSingleListDcsTeam
         * @apiGroup Teams
         */
        .put('/teams/:id/datacenters/:idu/roles/:ida', authenticate(), WrapperAccessApp.updateSingle)
        /**
         * @api {delete} /teams/:id/datacenters/:idu/roles/:ida dm. Delete access role
         * @apiName GetSingleListDcsTeam
         * @apiGroup Teams
         */
        .delete('/teams/:id/datacenters/:idu/roles/:ida', authenticate(), WrapperAccessApp.remove)

        /**
         * @api {get} /teams/:id/datacenters/:idu/servers/ dn. Count servers by Dc
         * @apiName GetListServersDcTeam
         * @apiGroup Teams
         */
        .get('/teams/:id/datacenters/:idu/servers/', authenticate(), WrapperSyncerApp().find)
        /**
         * @api {get} /teams/:id/datacenters/count do. Count Servers by Dcs
         * @apiName GetCountServersDcTeam
         * @apiGroup Teams
         */
        .get('/teams/:id/datacenters/:idu/analytics', authenticate(),  WrapperSyncerApp('count').find)
        /**
         * @api {post} /teams/:id/datacenters/count do. Create Analytics
         * @apiName GetDatacenterAnalyticsTeams
         * @apiGroup Teams
         */
        .post('/teams/:id/datacenters/:idu/analytics', authenticate(),  WrapperPersistenceApp(PersistenceDC)('createAnalytics').create);
};
