'use strict';

const authenticate = require('identity/middlewares/authenticate');

const Application = require('../../entities/Application');
const Server = require('../../entities/Servers');
const Team = require('identity/entities/Teams');

const PersistenceAppApplications = require('../../applications/persistenceApplications');
const WrapperPersistenceApp = require('core/applications/wrapperPersistenceApplication')(Application)(Team);
const WrapperPersistenceAppDefault = WrapperPersistenceApp()();

const AccessApp = require('core/applications/accessApplication');
const WrapperAccessApp = WrapperPersistenceApp(AccessApp)();

const DependenciesApp = require('inventory/applications/dependenciesApplication');
const WrappeDepsApp = WrapperPersistenceApp(DependenciesApp)();

const PersistenceRelation = require('../../applications/persistenceSystem')(Server);
const WrapperRelationsApp = WrapperPersistenceApp(PersistenceRelation)();

module.exports = function (router) {

    router
        /**
         * @api {get} /teams/:id/applications aa. List App for Team
         * @apiName GetListTeam
         * @apiGroup Teams
         * @apiDescription Use for teams scope, have be all actions, params and option in /applications,
         *
         * @apiParam (Param) {String} id Team unique ID.
         * @apiParam (Param) {String} idu App unique ID.
         */
        .get('/teams/:id/applications', authenticate(), WrapperPersistenceApp(PersistenceAppApplications)('findApplications').find)
        /**
         * @api {get} /teams/:id/applications/count ab. Count App for Team
         * @apiName GetCountListTeam
         * @apiGroup Teams
         */
        .get('/teams/:id/applications/count', authenticate(), WrapperPersistenceAppDefault.count)
        /**
         * @api {get} /teams/:id/applications/:idu ac. Single App for Team
         * @apiName GetSingleListTeam
         * @apiGroup Teams
         */
        .get('/teams/:id/applications/:idu', authenticate(), WrapperPersistenceAppDefault.findOne)
        /**
         * @api {put} /teams/:id/applications/:idu ad. Single App for Team
         * @apiName UpdateSingleListTeam
         * @apiGroup Teams
         */
        .put('/teams/:id/applications/:idu', authenticate(), WrapperPersistenceAppDefault.update)
        /**
         * @api {patch} /teams/:id/applications/:idu ae. Partial App for Team
         * @apiName GetPartialSingleListTeam
         * @apiGroup Teams
         */
        .patch('/teams/:id/applications/:idu', authenticate(), WrapperPersistenceAppDefault.patch)
        /**
         * @api {delete} /teams/:id/applications/:idu af. Single App for Team
         * @apiName DeleteSingleListTeam
         * @apiGroup Teams
         */
        .delete('/teams/:id/applications/:idu', authenticate(), WrapperPersistenceAppDefault.remove)

        /**
         * @api {post} /teams/:id/applications/ ag. App for Team
         * @apiName PostSingleListTeam
         * @apiGroup Teams
         */
        .post('/teams/:id/applications', authenticate(), WrapperPersistenceAppDefault.create)

        /**
         * @api {post} /teams/:id/applications/deps ah. Update multiple dependencies for Team
         * @apiName PostSingleListTeam
         * @apiGroup Teams
         */
        .post('/teams/:id/applications/deps', authenticate(), WrappeDepsApp.updateMany)

        /**
         * Roles
         */
         /**
          * @api {post} /teams/:id/applications/:idu/roles ai. Create access role
          * @apiName GetSingleListTeam
          * @apiGroup Teams
          */
        .post('/teams/:id/applications/:idu/roles', authenticate(), WrapperAccessApp.create)
        /**
         * @api {put} /teams/:id/applications/:idu/roles aj. Update all access role
         * @apiName GetSingleListTeam
         * @apiGroup Teams
         */
        .put('/teams/:id/applications/:idu/roles', authenticate(), WrapperAccessApp.update)
        /**
         * @api {put} /teams/:id/applications/:idu/roles/:ida al. Update access role
         * @apiName GetSingleListTeam
         * @apiGroup Teams
         */
        .put('/teams/:id/applications/:idu/roles/:ida', authenticate(), WrapperAccessApp.updateSingle)
        /**
         * @api {delete} /teams/:id/applications/:idu/roles/:ida am. Delete access role
         * @apiName GetSingleListTeam
         * @apiGroup Teams
         */
        .delete('/teams/:id/applications/:idu/roles/:ida', authenticate(), WrapperAccessApp.remove)

        /**
         * Dependencies
         */
        /**
         * @api {post} /teams/:id/applications/:idu/deps an. Create new dependence
         * @apiName CreateSingleDependence
         * @apiGroup Teams
         */
        .post('/teams/:id/applications/:idu/deps', authenticate(), WrappeDepsApp.create)
        /**
         * @api {put} /teams/:id/applications/:idu/deps/:ida ao. Update a single dependence
         * @apiName UpdateSingleDependence
         * @apiGroup Teams
         */
        .put('/teams/:id/applications/:idu/deps/:ida', authenticate(), WrappeDepsApp.updateSingle)
        /**
         * @api {delete} /teams/:id/applications/:idu/deps/:ida ap. Delete single dependence
         * @apiName DeleteSingledependence
         * @apiGroup Teams
         */
        .delete('/teams/:id/applications/:idu/deps/:ida', authenticate(), WrappeDepsApp.remove)

        /**
         * Servers
         */
        /**
         * @api {patch} /teams/:id/applications/:idu/servers a1. Add app system for teams
         * @apiName PatchServersInApplicationTeam
         * @apiGroup Teams
         */
        .patch('/teams/:id/applications/:idu/servers', authenticate(), WrapperRelationsApp.create)
        /**
         * @api {delete} /teams/:id/system/:idu/applications ar. Delete single app for teams
         * @apiName DeleteServersInApplicationTeam
         * @apiGroup Teams
         */
        .delete('/teams/:id/applications/:idu/servers', authenticate(), WrapperRelationsApp.remove);

};
