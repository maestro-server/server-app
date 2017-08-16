'use strict';

const authenticate = require('identity/profile/middlewares/authenticate');
const Client = require('../../entities/Clients');
const PersistenceApp = require('core/applications/persistenceApplication')(Client);
const AccessApp = require('core/applications/accessApplication')(Client);

const UploaderApp = require('core/applications/uploadApplication')(Client);

module.exports = function (router) {

  /**
   * @api {get} /teams/:id Get list of yours teams
   * @apiName Get Teams
   * @apiGroup Teams
   *
   * @apiParam (Query) {String} [email] Filter by email.
   * @apiParam (Query) {String} [name] Filter by name.
   * @apiParam (Query) {String} [url] Filter by url.
   *
   * @apiPermission JWT
   * @apiHeader (Auth) {String} Authorization JWT {Token}
   *
   * @apiError (Error) Unauthorized Invalid Token
   *
   * @apiSuccessExample {json} Success-Response:
   *     HTTP/1.1 200 OK
   *     {
   *       "firstname": "John",
   *       "lastname": "Doe"
   *     }
   */
    router
        .get('/', authenticate(), PersistenceApp.find)

        .get('/autocomplete', authenticate(), PersistenceApp.autocomplete)

        .get('/upload', authenticate(), UploaderApp.uploader)

        /**
         * @api {get} /teams/:id Get team information
         * @apiName Get Single Team
         * @apiGroup Teams
         *
         * @apiParam (Param) {String} id Teams unique ID.
         *
         * @apiPermission JWT
         * @apiHeader (Auth) {String} Authorization JWT {Token}
         *
         * @apiError (Error) PermissionError Token dont have permission
         * @apiError (Error) Unauthorized Invalid Token
         *
         * @apiSuccessExample {json} Success-Response:
         *     HTTP/1.1 200 OK
         *     {
         *       "firstname": "John",
         *       "lastname": "Doe"
         *     }
         */
        .get('/:id', authenticate(), PersistenceApp.findOne)

        .patch('/:id', authenticate(), PersistenceApp.update)

        /**
         * @api {delete} /teams/:id Delete team
         * @apiName Delete Single Team
         * @apiGroup Teams
         *
         * @apiParam (Param) {String} id Teams unique ID.
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
        .delete('/:id', authenticate(), PersistenceApp.remove)

        .post('/', authenticate(), PersistenceApp.create)

        .post('/:id/members', authenticate(), AccessApp.create)

        .put('/:id/members/:idu', authenticate(), AccessApp.update)

        /**
         * @api {delete} /teams/:id/members/:idu Delete member team
         * @apiName Delete Single Member of Team
         * @apiGroup Teams
         *
         * @apiParam (Param) {String} id Teams unique ID.
         * @apiParam (Param) {String} id Member unique ID.
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
        .delete('/:id/members/:idu', authenticate(), AccessApp.remove);
};
