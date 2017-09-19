'use strict';

const authenticate = require('identity/middlewares/authenticate');

const Datacenter = require('../../entities/Datacenter');
const Team = require('identity/entities/Teams');

const WrapperPersistenceApp = require('core/applications/wrapperPersistenceApplication')(Datacenter)(Team);

const AccessApp = require('core/applications/accessApplication');
const WrapperAccessApp = WrapperPersistenceApp(AccessApp);

module.exports = function (router) {

    router
        .get('/teams/:id/datacenters', authenticate(), WrapperPersistenceApp().find)

        .get('/teams/:id/datacenters/:idu', authenticate(), WrapperPersistenceApp().findOne)

        .put('/teams/:id/datacenters/:idu', authenticate(), WrapperPersistenceApp().update)

        .patch('/teams/:id/datacenters/:idu', authenticate(), WrapperPersistenceApp().patch)

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
        .delete('/teams/:id/datacenters/:idu', authenticate(), WrapperPersistenceApp().remove)

        .post('/teams/:id/datacenters', authenticate(), WrapperPersistenceApp().create)

        /**
         * Roles
         */

        .post('/teams/:id/datacenters/:idu/roles', authenticate(), WrapperAccessApp.create)

        .patch('/teams/:id/datacenters/:idu/roles/:ida', authenticate(), WrapperAccessApp.update)
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
        .delete('/teams/:id/datacenters/:idu/roles/:ida', authenticate(), WrapperAccessApp.remove);



};
