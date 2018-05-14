'use strict';

const authenticate = require('identity/middlewares/authenticate');

const Schedulers = require('../../entities/Scheduler');
const Team = require('identity/entities/Teams');

const PersistenceAppScheduler = require('../../applications/persistenceScheduler');
const WrapperPersistenceApp = require('core/applications/wrapperPersistenceApplication')(Schedulers)(Team);
const WrapperPersistenceAppDefault = WrapperPersistenceApp()();

const AccessApp = require('core/applications/accessApplication');
const WrapperAccessApp = WrapperPersistenceApp(AccessApp)();

module.exports = function (router) {

    router
        /**
         * @api {get} /teams/:id/schedules sa. List schedules for Team
         * @apiName GetListSchedules
         * @apiGroup Teams
         * @apiDescription Use for teams scope, have be all actions, params and option in /clients,
         *
         * @apiParam (Param) {String} id Team unique ID.
         * @apiParam (Param) {String} idu Server unique ID.
         */
        .get('/teams/:id/scheduler', authenticate(), WrapperPersistenceApp(PersistenceAppScheduler)().find)
        /**
         * @api {get} /teams/:id/schedules/count sb. Count schedules for Team
         * @apiName GetCountListSchedulesTeam
         * @apiGroup Teams
         */
        .get('/teams/:id/schedules/count', authenticate(), WrapperPersistenceAppDefault.count)
        /**
         * @api {get} /teams/:id/schedules/:idu sc. Single schedules for Team
         * @apiName GetSingleListschedulesTeam
         * @apiGroup Teams
         */
        .get('/teams/:id/scheduler/:idu', authenticate(), WrapperPersistenceAppDefault.findOne)
        /**
         * @api {get} /teams/:id/schedules/:idu/events sd. Single events of schedules for Team
         * @apiName GetSingleListEventsSchedulesTeam
         * @apiGroup Teams
         */
        .get('/teams/:id/scheduler/:idu/events', authenticate(), WrapperPersistenceApp(PersistenceAppScheduler)('findOne').find)
        /**
         * @api {put} /teams/:id/schedules/:idu se. Update all schedules for Team
         * @apiName UpdateSingleListschedulesTeam
         * @apiGroup Teams
         */
        .put('/teams/:id/scheduler/:idu', authenticate(), WrapperPersistenceAppDefault.update)
        /**
         * @api {patch} /teams/:id/schedules/:idu sf. Partial schedules for Team
         * @apiName GetPartialSingleListSchedulesTeam
         * @apiGroup Teams
         */
        .patch('/teams/:id/scheduler/:idu', authenticate(), WrapperPersistenceAppDefault.patch)
        /**
         * @api {delete} /teams/:id/schedules/:idu sg. Single schedules for Team
         * @apiName DeleteSingleListSchedulesTeam
         * @apiGroup Teams
         */
        .delete('/teams/:id/scheduler/:idu', authenticate(), WrapperPersistenceAppDefault.remove)
        /**
         * @api {post} /teams/:id/schedules/ sh. Create schedules for Team
         * @apiName PostSingleListSchedulesTeam
         * @apiGroup Teams
         */
        .post('/teams/:id/scheduler', authenticate(), WrapperPersistenceAppDefault.create)
        /**
         * @api {post} /teams/:id/schedules/ si. Create schedules for Team
         * @apiName PostSingleListSchedulesTeam
         * @apiGroup Teams
         */
        .post('/teams/:id/scheduler/template', authenticate(), WrapperPersistenceApp(PersistenceAppScheduler)('createTemplate').create)

        /**
         * Roles
         */
        /**
         * @api {post} /teams/:id/schedules/:idu/roles sj. Create access role
         * @apiName GetSingleListSchedulesTeam
         * @apiGroup Teams
         */
        .post('/teams/:id/scheduler/:idu/roles', authenticate(), WrapperAccessApp.create)
        /**
         * @api {put} /teams/:id/schedules/:idu/roles sl. Update all access role
         * @apiName GetSingleListSchedulesTeam
         * @apiGroup Teams
         */
        .put('/teams/:id/scheduler/:idu/roles', authenticate(), WrapperAccessApp.update)
        /**
         * @api {put} /teams/:id/schedules/:idu/roles/:ida sm. Update access role
         * @apiName GetSingleListSchedulesTeam
         * @apiGroup Teams
         */
        .put('/teams/:id/scheduler/:idu/roles/:ida', authenticate(), WrapperAccessApp.updateSingle)
        /**
         * @api {delete} /teams/:id/schedules/:idu/roles/:ida sn. Delete access role
         * @apiName GetSingleListSchedulesTeam
         * @apiGroup Teams
         */
        .delete('/teams/:id/scheduler/:idu/roles/:ida', authenticate(), WrapperAccessApp.remove);



};
