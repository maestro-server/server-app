'use strict';

const authenticate = require('identity/middlewares/authenticate');

const Reports = require('../../entities/Report');
const Team = require('identity/entities/Teams');

const PersistenceReport = require('../../applications/persistenceReports');
const WrapperPersistenceApp = require('core/applications/wrapperPersistenceApplication')(Reports)(Team);
const WrapperPersistenceAppReports = WrapperPersistenceApp(PersistenceReport);

const AccessApp = require('core/applications/accessApplication');
const WrapperAccessApp = WrapperPersistenceApp()(AccessApp);

module.exports = function (router) {

    router
    /**
     * @api {get} /teams/:id/reports sa. List reports for Team
     * @apiName GetListReports
     * @apiGroup Teams
     * @apiDescription Use for teams scope, have be all actions, params and option in /clients,
     *
     * @apiParam (Param) {String} id Team unique ID.
     * @apiParam (Param) {String} idu Server unique ID.
     */
        .get('/teams/:id/reports', authenticate(), WrapperPersistenceApp()().find)
        /**
         * @api {get} /teams/:id/reports/count sb. Count reports for Team
         * @apiName GetCountListReportsTeam
         * @apiGroup Teams
         */
        .get('/teams/:id/reports/count', authenticate(), WrapperPersistenceApp()().count)
        /**
         * @api {get} /teams/:id/reports/:idu sc. Single reports for Team
         * @apiName GetSingleListreportsTeam
         * @apiGroup Teams
         */
        .get('/teams/:id/reports/:idu', authenticate(), WrapperPersistenceApp()().findOne)
        
        .get('/teams/:id/reports/:idu/result', authenticate(), WrapperPersistenceAppReports('getReport').find)
        /**
         * @api {put} /teams/:id/reports/:idu sd. Update all reports for Team
         * @apiName UpdateSingleListreportsTeam
         * @apiGroup Teams
         */
        .put('/teams/:id/reports/:idu', authenticate(), WrapperPersistenceApp()().update)
        /**
         * @api {patch} /teams/:id/reports/:idu se. Partial reports for Team
         * @apiName GetPartialSingleListReportsTeam
         * @apiGroup Teams
         */
        .patch('/teams/:id/reports/:idu', authenticate(), WrapperPersistenceApp()().patch)

        /**
         * @api {delete} /teams/:id/reports/:idu sf. Single reports for Team
         * @apiName DeleteSingleListReportsTeam
         * @apiGroup Teams
         */
        .delete('/teams/:id/reports/:idu', authenticate(), WrapperPersistenceAppReports().remove)
        /**
         * @api {post} /teams/:id/reports/ sg. Create reports for Team
         * @apiName PostSingleListReportsTeam
         * @apiGroup Teams
         */
        .post('/teams/:id/reports', authenticate(), WrapperPersistenceAppReports().create)

        /**
         * Roles
         */
        /**
         * @api {post} /teams/:id/reports/:idu/roles sh. Create access role
         * @apiName GetSingleListReportsTeam
         * @apiGroup Teams
         */
        .post('/teams/:id/reports/:idu/roles', authenticate(), WrapperAccessApp.create)
        /**
         * @api {put} /teams/:id/reports/:idu/roles si. Update all access role
         * @apiName GetSingleListReportsTeam
         * @apiGroup Teams
         */
        .put('/teams/:id/reports/:idu/roles', authenticate(), WrapperAccessApp.update)
        /**
         * @api {put} /teams/:id/reports/:idu/roles/:ida sj. Update access role
         * @apiName GetSingleListReportsTeam
         * @apiGroup Teams
         */
        .put('/teams/:id/reports/:idu/roles/:ida', authenticate(), WrapperAccessApp.updateSingle)
        /**
         * @api {delete} /teams/:id/reports/:idu/roles/:ida sl. Delete access role
         * @apiName GetSingleListReportsTeam
         * @apiGroup Teams
         */
        .delete('/teams/:id/reports/:idu/roles/:ida', authenticate(), WrapperAccessApp.remove);


};