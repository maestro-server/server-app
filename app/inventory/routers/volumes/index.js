'use strict';

const authenticate = require('identity/middlewares/authenticate');

const Volumes = require('../../entities/Volumes');
const Team = require('identity/entities/Teams');

const WrapperPersistenceApp = require('core/applications/wrapperPersistenceApplication')(Volumes)(Team);
const WrapperPersistenceAppDefault = WrapperPersistenceApp()();

const AccessApp = require('core/applications/accessApplication');
const WrapperAccessApp = WrapperPersistenceApp(AccessApp)();

module.exports = function (router) {

    router
        .get('/teams/:id/volumes', authenticate(), WrapperPersistenceAppDefault.find)

        .get('/teams/:id/volumes/count', authenticate(), WrapperPersistenceAppDefault.count)

        .get('/teams/:id/volumes/:idu', authenticate(), WrapperPersistenceAppDefault.findOne)

        .put('/teams/:id/volumes/:idu', authenticate(), WrapperPersistenceAppDefault.update)

        .patch('/teams/:id/volumes/:idu', authenticate(), WrapperPersistenceAppDefault.patch)

        /**
         * @api {delete} /teams/:id/volumes/:idu Delete application of team
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
        .delete('/teams/:id/volumes/:idu', authenticate(), WrapperPersistenceAppDefault.remove)

        .post('/teams/:id/volumes', authenticate(), WrapperPersistenceAppDefault.create)

        /**
         * Roles
         */

        .post('/teams/:id/volumes/:idu/roles', authenticate(), WrapperAccessApp.create)

        .put('/teams/:id/volumes/:idu/roles', authenticate(), WrapperAccessApp.update)

        .put('/teams/:id/volumes/:idu/roles/:ida', authenticate(), WrapperAccessApp.updateSingle)
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
        .delete('/teams/:id/volumes/:idu/roles/:ida', authenticate(), WrapperAccessApp.remove);

};
