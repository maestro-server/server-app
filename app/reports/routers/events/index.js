'use strict';

const authenticate = require('identity/middlewares/authenticate');

const Events = require('../../entities/Event');
const Team = require('identity/entities/Teams');

const WrapperPersistenceApp = require('core/applications/wrapperPersistenceApplication')(Events)(Team)();

const AccessApp = require('core/applications/accessApplication');
const WrapperAccessApp = WrapperPersistenceApp(AccessApp);

module.exports = function (router) {

    router
    /**
     * @api {get} /teams/:id/events sa. List events for Team
     * @apiName GetListEvents
     * @apiGroup Teams
     * @apiDescription Use for teams scope, have be all actions, params and option in /events,
     *
     * @apiParam (Param) {String} id Team unique ID.
     * @apiParam (Param) {String} idu Server unique ID.
     */
        .get('/teams/:id/events', authenticate(), WrapperPersistenceApp().find)
        /**
         * @api {get} /teams/:id/events/count sb. Count events for Team
         * @apiName GetCountListEventsTeam
         * @apiGroup Teams
         */
        .get('/teams/:id/events/count', authenticate(), WrapperPersistenceApp().count)
        /**
         * @api {get} /teams/:id/events/:idu sc. Single events for Team
         * @apiName GetSingleListeventsTeam
         * @apiGroup Teams
         */
        .get('/teams/:id/events/:idu', authenticate(), WrapperPersistenceApp().findOne)
        /**
         * @api {put} /teams/:id/events/:idu sd. Update all events for Team
         * @apiName UpdateSingleListeventsTeam
         * @apiGroup Teams
         */
        .put('/teams/:id/events/:idu', authenticate(), WrapperPersistenceApp().update)
        /**
         * @api {patch} /teams/:id/events/:idu se. Partial events for Team
         * @apiName GetPartialSingleListEventsTeam
         * @apiGroup Teams
         */
        .patch('/teams/:id/events/:idu', authenticate(), WrapperPersistenceApp().patch)

        /**
         * @api {delete} /teams/:id/events/:idu sf. Single events for Team
         * @apiName DeleteSingleListEventsTeam
         * @apiGroup Teams
         */
        .delete('/teams/:id/events/:idu', authenticate(), WrapperPersistenceApp().remove)
        /**
         * @api {post} /teams/:id/events/ sg. Create events for Team
         * @apiName PostSingleListEventsTeam
         * @apiGroup Teams
         */
        .post('/teams/:id/events', authenticate(), WrapperPersistenceApp().create)

        /**
         * Roles
         */
        /**
         * @api {post} /teams/:id/events/:idu/roles sh. Create access role
         * @apiName GetSingleListEventsTeam
         * @apiGroup Teams
         */
        .post('/teams/:id/events/:idu/roles', authenticate(), WrapperAccessApp.create)
        /**
         * @api {put} /teams/:id/events/:idu/roles si. Update all access role
         * @apiName GetSingleListEventsTeam
         * @apiGroup Teams
         */
        .put('/teams/:id/events/:idu/roles', authenticate(), WrapperAccessApp.update)
        /**
         * @api {put} /teams/:id/events/:idu/roles/:ida sj. Update access role
         * @apiName GetSingleListEventsTeam
         * @apiGroup Teams
         */
        .put('/teams/:id/events/:idu/roles/:ida', authenticate(), WrapperAccessApp.updateSingle)
        /**
         * @api {delete} /teams/:id/events/:idu/roles/:ida sl. Delete access role
         * @apiName GetSingleListEventsTeam
         * @apiGroup Teams
         */
        .delete('/teams/:id/events/:idu/roles/:ida', authenticate(), WrapperAccessApp.remove);



};
