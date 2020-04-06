'use strict';

const authenticate = require('identity/middlewares/authenticate');

const System = require('../../entities/System');
const Application = require('../../entities/Application');
const Team = require('identity/entities/Teams');

const PersistenceAppClients = require('../../applications/persistenceClients');
const WrapperPersistenceApp = require('core/applications/wrapperPersistenceApplication')(System)(Team);
const WrapperPersistenceAppDefault = WrapperPersistenceApp()();

const PersistenceAudit = require('core/applications/persistenceAudit');
const WrappeAuditApp = WrapperPersistenceApp(PersistenceAudit)();

const AccessApp = require('core/applications/accessApplication');
const WrapperAccessApp = WrapperPersistenceApp(AccessApp)();

const PersistenceRelation = require('../../applications/persistenceRelationSystem')(Application);
const WrapperRelationsApp = WrapperPersistenceApp(PersistenceRelation)();

module.exports = function (router) {

    router
    /**
         * @api {get} /teams/:id/system sya. List System for Team
         * @apiName GetListSystem
         * @apiGroup Teams
         * @apiDescription Use for teams scope, have be all actions, params and option in /system,
         *
         * @apiParam (Param) {String} id Team unique ID.
         * @apiParam (Param) {String} idu System unique ID.
         */
        .get('/teams/:id/system', authenticate(), WrapperPersistenceApp(PersistenceAppClients)('findClients').find)
        /**
         * @api {get} /teams/:id/system/count syb. Count System for Team
         * @apiName GetCountListSystemTeam
         * @apiGroup Teams
         */
        .get('/teams/:id/system/count', authenticate(), WrapperPersistenceAppDefault.count)
        /**
         * @api {get} /teams/:id/system/:idu syc. Single System for Team
         * @apiName GetSingleListSystemTeam
         * @apiGroup Teams
         */
        .get('/teams/:id/system/:idu', authenticate(), WrapperPersistenceAppDefault.findOne)
        /**
         * @api {put} /teams/:id/system/:idu syd. Update all System for Team
         * @apiName UpdateSingleListTeam
         * @apiGroup Teams
         */
        .put('/teams/:id/system/:idu', authenticate(), WrapperPersistenceAppDefault.update)
        /**
         * @api {patch} /teams/:id/system/:idu sye. Partial System for Team
         * @apiName GetPartialSingleListSystemTeam
         * @apiGroup Teams
         */
        .patch('/teams/:id/system/:idu', authenticate(), WrapperPersistenceAppDefault.patch)
        /**
         * @api {delete} /teams/:id/system/:idu syf. Single System for Team
         * @apiName DeleteSingleListSystemTeam
         * @apiGroup Teams
         */
        .delete('/teams/:id/system/:idu', authenticate(), WrapperPersistenceAppDefault.remove)
        /**
         * @api {post} /teams/:id/system/ syg. Create System for Team
         * @apiName PostSingleListSystemTeam
         * @apiGroup Teams
         */
        .post('/teams/:id/system', authenticate(), WrapperPersistenceAppDefault.create)

        /**
         * @api {get} /teams/:id/system/:idu/audit syh. Get changed history
         * @apiName GetSystemsAuditTeam
         * @apiGroup Teams
         */
        .get('/teams/:id/system/:idu/audit', authenticate(), WrappeAuditApp.find)

        /**
         * Roles
         */
         /**
          * @api {post} /teams/:id/system/:idu/roles syi. Create access role
          * @apiName GetSingleListSystemTeam
          * @apiGroup Teams
          */
        .post('/teams/:id/system/:idu/roles', authenticate(), WrapperAccessApp.create)
        /**
         * @api {put} /teams/:id/system/:idu/roles syj. Update all access role
         * @apiName GetSingleListSystemTeam
         * @apiGroup Teams
         */
        .put('/teams/:id/system/:idu/roles', authenticate(), WrapperAccessApp.update)
        /**
         * @api {put} /teams/:id/system/:idu/roles/:ida syl. Update access role
         * @apiName GetSingleListSystemTeam
         * @apiGroup Teams
         */
        .put('/teams/:id/system/:idu/roles/:ida', authenticate(), WrapperAccessApp.updateSingle)
        /**
         * @api {delete} /teams/:id/system/:idu/roles/:ida sym. Delete access role
         * @apiName GetSingleListSystemTeam
         * @apiGroup Teams
         */
        .delete('/teams/:id/system/:idu/roles/:ida', authenticate(), WrapperAccessApp.remove)

        /**
         * Applications
         */
        /**
         * @api {patch} /teams/:id/system/:idu/applications syn. Add app system for teams
         * @apiName PatchAppInSystemTeam
         * @apiGroup Teams
         */
        .patch('/teams/:id/system/:idu/applications', authenticate(), WrapperRelationsApp.create)
        /**
         * @api {delete} /teams/:id/system/:idu/applications syo. Delete single app for teams
         * @apiName DeleteAppInSystemTeam
         * @apiGroup Teams
         */
        .delete('/teams/:id/system/:idu/applications', authenticate(), WrapperRelationsApp.remove);

};
