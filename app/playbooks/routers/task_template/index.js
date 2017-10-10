'use strict';

const authenticate = require('identity/middlewares/authenticate');

const TaskTemplate = require('../../entities/TaskTemplate');
const Team = require('identity/entities/Teams');

const WrapperPersistenceApp = require('core/applications/wrapperPersistenceApplication')(TaskTemplate)(Team);

const AccessApp = require('core/applications/accessApplication');
const WrapperAccessApp = WrapperPersistenceApp(AccessApp);

module.exports = function (router) {

    router
        .get('/teams/:id/task_template', authenticate(), WrapperPersistenceApp().find)

        .get('/teams/:id/task_template/count', authenticate(), WrapperPersistenceApp().count)

        .get('/teams/:id/task_template/:idu', authenticate(), WrapperPersistenceApp().findOne)

        .put('/teams/:id/task_template/:idu', authenticate(), WrapperPersistenceApp().update)

        .patch('/teams/:id/task_template/:idu', authenticate(), WrapperPersistenceApp().patch)

        /**
         * @api {delete} /teams/:id/applications/:idu Delete application of team
         * @apiName Delete Single application of Team
         * @apiGroup Teams
         *
         * @apiParam (Param) {String} id Team unique ID.
         * @apiParam (Param) {String} idu Application unique ID.
         *
         * @apiPermission JWT
         * @apiHeader (Auth) {String} Authorization JWT {Token}
         *
         * @apiError (Error) PermissionError Token dont have permission
         * @apiError (Error) Unauthorized Invalid Token
         *
         * @apiSuccessExample {json} Success-Response:
         *     HTTP/1.1 204 OK
         */
        .delete('/teams/:id/task_template/:idu', authenticate(), WrapperPersistenceApp().remove)

        .post('/teams/:id/task_template', authenticate(), WrapperPersistenceApp().create)

        /**
         * Roles
         */

        .post('/teams/:id/task_template/:idu/roles', authenticate(), WrapperAccessApp.create)

        .put('/teams/:id/task_template/:idu/roles', authenticate(), WrapperAccessApp.update)

        .put('/teams/:id/task_template/:idu/roles/:ida', authenticate(), WrapperAccessApp.updateSingle)
        /**
         * @api {delete} /teams/:id/projects/:idu Delete role of application team
         * @apiName Delete Role of application Team
         * @apiGroup Teams
         *
         * @apiParam (Param) {String} id Teams unique ID.
         * @apiParam (Param) {String} idu Application unique ID.
         * @apiParam (Param) {String} ida Role unique ID.
         *
         * @apiPermission JWT
         * @apiHeader (Auth) {String} Authorization JWT {Token}
         *
         * @apiError (Error) PermissionError Token dont have permission
         * @apiError (Error) Unauthorized Invalid Token
         *
         * @apiSuccessExample {json} Success-Response:
         *     HTTP/1.1 204 OK
         */
        .delete('/teams/:id/task_template/:idu/roles/:ida', authenticate(), WrapperAccessApp.remove);



};
