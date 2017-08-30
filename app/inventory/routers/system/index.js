'use strict';

const authenticate = require('identity/middlewares/authenticate');

const System = require('../../entities/System');
const Team = require('identity/entities/Teams');

const WrapperPersistenceApp = require('core/applications/wrapperPersistenceApplication')(System)(Team);

const AccessApp = require('core/applications/accessApplication');
const WrapperAccessApp = WrapperPersistenceApp(AccessApp);

module.exports = function (router) {

    router
        .get('/teams/:id/system', authenticate(), WrapperPersistenceApp().find)

        .get('/teams/:id/system/:idu', authenticate(), WrapperPersistenceApp().findOne)

        .patch('/teams/:id/system/:idu', authenticate(), WrapperPersistenceApp().update)

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
        .delete('/teams/:id/system/:idu', authenticate(), WrapperPersistenceApp().remove)

        .post('/teams/:id/system', authenticate(), WrapperPersistenceApp().create)

        /**
         * Roles
         */

        .post('/teams/:id/system/:idu/roles', authenticate(), WrapperAccessApp.create)

        .patch('/teams/:id/system/:idu/roles/:ida', authenticate(), WrapperAccessApp.update)
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
        .delete('/teams/:id/system/:idu/roles/:ida', authenticate(), WrapperAccessApp.remove);

};
