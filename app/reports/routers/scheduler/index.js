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
         * @api {get} /teams/:id/scheduler sa. List scheduler for Team
         * @apiName GetListSchedules
         * @apiGroup Teams
         * @apiDescription Use for teams scope, have be all actions, params and option in /scheduler,
         *
         * @apiParam (Param) {String} id Team unique ID.
         * @apiParam (Param) {String} idu Server unique ID.
         */
        .get('/teams/:id/scheduler', authenticate(), WrapperPersistenceApp(PersistenceAppScheduler)().find)
        /**
         * @api {get} /teams/:id/scheduler/count sb. Count scheduler for Team
         * @apiName GetCountListSchedulesTeam
         * @apiGroup Teams
         */
        .get('/teams/:id/scheduler/count', authenticate(), WrapperPersistenceAppDefault.count)
        /**
         * @api {get} /teams/:id/scheduler/:idu sc. Single scheduler for Team
         * @apiName GetSingleListschedulerTeam
         * @apiGroup Teams
         */
        .get('/teams/:id/scheduler/:idu', authenticate(), WrapperPersistenceAppDefault.findOne)
        /**
         * @api {get} /teams/:id/scheduler/:idu/events sd. Single events of scheduler for Team
         * @apiName GetSingleListEventsSchedulesTeam
         * @apiGroup Teams
         */
        .get('/teams/:id/scheduler/:idu/events', authenticate(), WrapperPersistenceApp(PersistenceAppScheduler)('findEvents').find)
        /**
         * @api {put} /teams/:id/scheduler/:idu se. Update all scheduler for Team
         * @apiName UpdateSingleListschedulerTeam
         * @apiGroup Teams
         */
        .put('/teams/:id/scheduler/:idu', authenticate(), WrapperPersistenceAppDefault.update)
        /**
         * @api {patch} /teams/:id/scheduler/:idu sf. Partial scheduler for Team
         * @apiName GetPartialSingleListSchedulesTeam
         * @apiGroup Teams
         */
        .patch('/teams/:id/scheduler/:idu', authenticate(), WrapperPersistenceAppDefault.patch)
        /**
         * @api {delete} /teams/:id/scheduler/:idu sg. Single scheduler for Team
         * @apiName DeleteSingleListSchedulesTeam
         * @apiGroup Teams
         */
        .delete('/teams/:id/scheduler/:idu', authenticate(), WrapperPersistenceApp(PersistenceAppScheduler)().remove)
        /**
         * @api {post} /teams/:id/scheduler/ sh. Create scheduler for Team
         * @apiName PostSingleListSchedulesTeam
         * @apiGroup Teams
         */
        .post('/teams/:id/scheduler', authenticate(), WrapperPersistenceAppDefault.create)
        /**
         * @api {post} /teams/:id/scheduler/ si. Create scheduler for Team
         * @apiName PostSingleListSchedulesTeam
         * @apiGroup Teams
         */
        .post('/teams/:id/scheduler/template', authenticate(), WrapperPersistenceApp(PersistenceAppScheduler)('createTemplate').create)

        /**
         * Roles
         */
        /**
         * @api {post} /teams/:id/scheduler/:idu/roles sj. Create access role
         * @apiName GetSingleListSchedulesTeam
         * @apiGroup Teams
         */
        .post('/teams/:id/scheduler/:idu/roles', authenticate(), WrapperAccessApp.create)
        /**
         * @api {put} /teams/:id/scheduler/:idu/roles sl. Update all access role
         * @apiName GetSingleListSchedulesTeam
         * @apiGroup Teams
         */
        .put('/teams/:id/scheduler/:idu/roles', authenticate(), WrapperAccessApp.update)
        /**
         * @api {put} /teams/:id/scheduler/:idu/roles/:ida sm. Update access role
         * @apiName GetSingleListSchedulesTeam
         * @apiGroup Teams
         */
        .put('/teams/:id/scheduler/:idu/roles/:ida', authenticate(), WrapperAccessApp.updateSingle)
        /**
         * @api {delete} /teams/:id/scheduler/:idu/roles/:ida sn. Delete access role
         * @apiName GetSingleListSchedulesTeam
         * @apiGroup Teams
         */
        .delete('/teams/:id/scheduler/:idu/roles/:ida', authenticate(), WrapperAccessApp.remove);



};
