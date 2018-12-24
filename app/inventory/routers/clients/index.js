'use strict';

const authenticate = require('identity/middlewares/authenticate');

const Clients = require('../../entities/Clients');
const System = require('../../entities/System');
const Team = require('identity/entities/Teams');

const WrapperPersistenceApp = require('core/applications/wrapperPersistenceApplication')(Clients)(Team);
const WrapperPersistenceAppDefault = WrapperPersistenceApp()();

const PersistenceAudit = require('core/applications/persistenceAudit');
const WrappeAuditApp = WrapperPersistenceApp(PersistenceAudit)();

const AccessApp = require('core/applications/accessApplication');
const WrapperAccessApp = WrapperPersistenceApp(AccessApp)();

const PersistenceRelation = require('../../applications/persistenceSystem')(System);
const WrapperRelationsApp = WrapperPersistenceApp(PersistenceRelation)();

module.exports = function (router) {

    router
        /**
         * @api {get} /teams/:id/clients cla. List Clients for Team
         * @apiName GetListClients
         * @apiGroup Teams
         * @apiDescription Use for teams scope, have be all actions, params and option in /clients,
         *
         * @apiParam (Param) {String} id Team unique ID.
         * @apiParam (Param) {String} idu Client unique ID.
         */
        .get('/teams/:id/clients', authenticate(), WrapperPersistenceAppDefault.find)
        /**
         * @api {get} /teams/:id/clients/count clb. Count Clients for Team
         * @apiName GetCountListClientsTeam
         * @apiGroup Teams
         */
        .get('/teams/:id/clients/count', authenticate(), WrapperPersistenceAppDefault.count)
        /**
         * @api {get} /teams/:id/clients/:idu clc. Single Client for Team
         * @apiName GetSingleListClientsTeam
         * @apiGroup Teams
         */
        .get('/teams/:id/clients/:idu', authenticate(), WrapperPersistenceAppDefault.findOne)
        /**
         * @api {put} /teams/:id/clients/:idu cld. Update all Clients for Team
         * @apiName UpdateSingleListClientTeam
         * @apiGroup Teams
         */
        .put('/teams/:id/clients/:idu', authenticate(), WrapperPersistenceAppDefault.update)
        /**
         * @api {patch} /teams/:id/clients/:idu cle. Partial Clients for Team
         * @apiName GetPartialSingleListClientsTeam
         * @apiGroup Teams
         */
        .patch('/teams/:id/clients/:idu', authenticate(), WrapperPersistenceAppDefault.patch)
        /**
         * @api {delete} /teams/:id/clients/:idu clf. Single Clients for Team
         * @apiName DeleteSingleListClientsTeam
         * @apiGroup Teams
         */
        .delete('/teams/:id/clients/:idu', authenticate(), WrapperPersistenceAppDefault.remove)
        /**
         * @api {post} /teams/:id/clients/ clg. Create Clients for Team
         * @apiName PostSingleListClientsTeam
         * @apiGroup Teams
         */
        .post('/teams/:id/clients', authenticate(), WrapperPersistenceAppDefault.create)

        /**
         * @api {get} /teams/:id/clients/:idu/audit cl. Get changed history
         * @apiName GetClientsAuditTeam
         * @apiGroup Teams
         */
        .get('/teams/:id/clients/:idu/audit', authenticate(), WrappeAuditApp.find)

        /**
         * Roles
         */
        /**
         * @api {post} /teams/:id/clients/:idu/roles clh. Create access role
         * @apiName GetSingleListClientsTeam
         * @apiGroup Teams
         */
        .post('/teams/:id/clients/:idu/roles', authenticate(), WrapperAccessApp.create)
        /**
         * @api {put} /teams/:id/clients/:idu/roles cli. Update all access role
         * @apiName GetSingleListClientsTeam
         * @apiGroup Teams
         */
        .put('/teams/:id/clients/:idu/roles', authenticate(), WrapperAccessApp.update)
        /**
         * @api {put} /teams/:id/clients/:idu/roles/:ida clj. Update access role
         * @apiName GetSingleListClientsTeam
         * @apiGroup Teams
         */
        .put('/teams/:id/clients/:idu/roles/:ida', authenticate(), WrapperAccessApp.updateSingle)
        /**
         * @api {delete} /teams/:id/clients/:idu/roles/:ida cll. Delete access role
         * @apiName GetSingleListClientsTeam
         * @apiGroup Teams
         */
        .delete('/teams/:id/clients/:idu/roles/:ida', authenticate(), WrapperAccessApp.remove)

        /**
         * System
         */
        /**
         * @api {patch} /teams/:id/clients/:idu/system clm. Add single system for teams
         * @apiName PatchSystemInTeamTeam
         * @apiGroup Teams
         */
        .patch('/teams/:id/clients/:idu/system', authenticate(), WrapperRelationsApp.create)
        /**
         * @api {delete} /teams/:id/clients/:idu/system cln. Delete single system for teams
         * @apiName DeleteSystemInTeamTeam
         * @apiGroup Teams
         */
        .delete('/teams/:id/clients/:idu/system', authenticate(), WrapperRelationsApp.remove);

};
