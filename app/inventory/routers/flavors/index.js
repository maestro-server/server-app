'use strict';

const authenticate = require('identity/middlewares/authenticate');

const Flavors = require('../../entities/Flavors');
const Team = require('identity/entities/Teams');

const WrapperPersistenceApp = require('core/applications/wrapperPersistenceApplication')(Flavors)(Team);
const WrapperPersistenceAppDefault = WrapperPersistenceApp()();

const AccessApp = require('core/applications/accessApplication');
const WrapperAccessApp = WrapperPersistenceApp(AccessApp)();

module.exports = function (router) {

    router
        .get('/teams/:id/flavors', authenticate(), WrapperPersistenceApp()().find)

        .get('/teams/:id/flavors/count', authenticate(), WrapperPersistenceAppDefault.count)

        .get('/teams/:id/flavors/:idu', authenticate(), WrapperPersistenceAppDefault.findOne)

        .put('/teams/:id/flavors/:idu', authenticate(), WrapperPersistenceAppDefault.update)

        .patch('/teams/:id/flavors/:idu', authenticate(), WrapperPersistenceAppDefault.patch)

        /**
         * @api {delete} /teams/:id/images/:idu Delete application of team
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
        .delete('/teams/:id/flavors/:idu', authenticate(), WrapperPersistenceAppDefault.remove)

        .post('/teams/:id/flavors', authenticate(), WrapperPersistenceAppDefault.create)

        /**
         * Roles
         */

        .post('/teams/:id/flavors/:idu/roles', authenticate(), WrapperAccessApp.create)

        .put('/teams/:id/flavors/:idu/roles', authenticate(), WrapperAccessApp.update)

        .put('/teams/:id/flavors/:idu/roles/:ida', authenticate(), WrapperAccessApp.updateSingle)
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
        .delete('/teams/:id/images/:idu/roles/:ida', authenticate(), WrapperAccessApp.remove);

};
