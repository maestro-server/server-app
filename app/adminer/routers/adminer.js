'use strict';

const authenticate = require('identity/middlewares/authenticate');
const Adminer = require('../entities/Adminer');

const PersistenceApp = require('core/applications/persistenceApplication')(Adminer);


module.exports = function (router) {

    router
        /**
         * @api {get} /adminer a. List your adminer
         * @apiName GetAdminer
         * @apiGroup Adminer
         *
         * @apiParam (Param) {String} [limit=20] Limit result.
         * @apiParam (Param) {String} [page=1] Show result by page.
         * @apiParam (Param) {String} [key] Filter by key (like servers-options).
         * @apiParam (Param) {String} [field] Filter by any field with exacly value.
         *
         * @apiPermission JWT
         * @apiHeader (Auth) {String} Authorization JWT {Token}
         *
         * @apiError (Error) PermissionError Token don`t have permission
         * @apiError (Error) Unauthorized Invalid Token
         * @apiError (Error) NotFound List is empty
         *
         * @apiSuccessExample {json} Success-Response:
         *     HTTP/1.1 200 OK
         *     {
             *        found: 3,
             *        limit: 20,
             *        total_pages: 1,
             *        current_page: 1,
             *        items: []
             *     }
         */
        .get('/', authenticate(), PersistenceApp.find)
        /**
         * @api {get} /adminer/:id c. Get single adminer
         * @apiName GetSingleAdminer
         * @apiGroup Adminer
         *
         * @apiParam (Param) {String} id Adminer unique id.
         *
         * @apiPermission JWT
         * @apiHeader (Auth) {String} Authorization JWT {Token}
         *
         * @apiError (Error) PermissionError Token don`t have permission
         * @apiError (Error) Unauthorized Invalid Token
         * @apiError (Error) NotFound Entity not exist
         *
         * @apiSuccessExample {json} Success-Response:
         *     HTTP/1.1 200 OK
         *     {
         *        _id: (String)
         *        created_at: (Datetime)
         *        updated_at: (Datetime)
         *        roles: []
         *        owner: []
         *        _links: {}
         *     }
         */
        .get('/:id', authenticate(), PersistenceApp.findOne)
        /**
         * @api {patch} /adminer/:id e. Update adminer
         * @apiName PutSingleAdminer
         * @apiGroup Adminer
         *
         * @apiParam (Param) {String} id Adminer unique id.
         *
         * @apiParam (Body x-www) {Object} key Key name [min 3, max 150]
         * @apiParam (Body x-www) {Aray} [value] List of value [Array of objects]
         *
         * @apiPermission JWT (Write | Admin)
         * @apiHeader (Header) {String} Authorization JWT {Token}
         *
         * @apiError (Error) PermissionError Token don`t have permission
         * @apiError (Error) Unauthorized Invalid Token
         * @apiError (Error) ValidationError Incorrect fields
         * @apiError (Error) NotFound Entity not exist
         *
         * @apiSuccessExample {json} Success-Response:
         *     HTTP/1.1 202 OK
         *     {
         *        _id: (String)
         *        created_at: (Datetime)
         *        updated_at: (Datetime)
         *        fields: (Mixed)
         *     }
         */
        .patch('/:id', authenticate(), PersistenceApp.patch);
};
