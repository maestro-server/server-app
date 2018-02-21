'use strict';

const authenticate = require('identity/middlewares/authenticate');
const Reports = require('../../entities/Report');


const PersistenceReport = require('../../applications/persistenceReports')(Reports);
const PersistenceApp = require('core/applications/persistenceApplication')(Reports);
const AccessApp = require('core/applications/accessApplication')(Reports);

module.exports = function (router) {

    router
        /**
         * @api {get} /reports a. List your reports
         * @apiName List all active reports, have a posibility to use filters, pagination, queries and etc.
         * @apiGroup Reports
         *
         * @apiParam (Param) {Json} [query] Create a query to filters, the fields received some transformation.
         * <br/>
         * <pre class="prettyprint language-json" data-type="json">
         * <code>{
             * <br/>   "name": 'search by name'
             * <br/>}
         *  </code>
         * </pre>
         * <br/><b>Reports don´t have modifications, only default regex filter:</b>
         * <br/><i>{alias} = {query into mongodb}</i>
         * <ul>
         *     <li>field is string the querie execute a regex research like "%filter%", EX: {'name': 'serv'}, It will return result with name 'services58' or '754services'.</li>
         * </ul>
         * @apiParam (Param) {String} [limit=20] Limit result.
         * @apiParam (Param) {String} [page=1] Show result by page.
         * @apiParam (Param) {String} [name] Filter by name (Exacly).
         * @apiParam (Param) {String} [component] Component name (Server, Application, Databases, LoadBalances, etc).
         * @apiParam (Param) {String} [status] Filter by status (process, finished, error).
         * @apiParam (Param) {String} [report] Report category (general, pivot).
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
         * @api {get} /reports/count b. Count total reports
         * @apiName Get total reports.
         * @apiGroup Reports
         *
         * @apiParam (Param) {String} [name] Filter by name (Exacly).
         * @apiParam (Param) {String} [field] Filter by exacly value.
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
         *        count: (Number)
         *     }
         */
        .get('/count', authenticate(), PersistenceApp.count)
        /**
         * @api {get} /reports/:id c. Get single report
         * @apiName Get single report.
         * @apiGroup Reports
         *
         * @apiParam (Param) {String} id Report unique id.
         *
         * @apiPermission JWT
         * @apiHeader (Auth) {String} Authorization JWT {Token}
         * 
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
         * @api {get} /reports/:id/result d. Get report result
         * @apiName Get report result.
         * @apiGroup Reports
         *
         * @apiParam (Param) {String} id Report unique id.
         * @apiParam (Param) {String} [limit=20] Limit result.
         * @apiParam (Param) {String} [page=1] Show result by page.
         * @apiParam (Param) {Object} [field] Filter with any field and value.
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
        .get('/:id/result', authenticate(), PersistenceReport.getReport)
        /**
         * @api {post} /reports/ d. Create single report
         * @apiName PostReports
         * @apiGroup Reports
         *
         * @apiParam (Body x-www) {String} name Name [min 3, max 30]
         * @apiParam (Body x-www) {String} [description] Description
         * @apiParam (Body x-www) {String} component Component name [min 3, max 30]
         * @apiParam (Body x-www) {String} report Report category (pivot, general)
         * @apiParam (Body x-www) {Array} [columns] List of columns mapped, used to create view report.
         * @apiParam (Body x-www) {String} [filters] Filters used to generate result
         * @apiParam (Body x-www) {String} [msg] Foreign id table, used to link with other db collection table
         * @apiParam (Body x-www) {String} [status] Status (finished, process, error)
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
         *     HTTP/1.1 201 OK
         *     {
         *        _id: (String)
         *        created_at: (Datetime)
         *        updated_at: (Datetime)
         *        roles: []
         *        owner: []
         *        _links: {}
         *     }
         */
        .post('/', authenticate(), PersistenceReport.create)
        /**
         * @api {patch} /reports/:id e. Update report
         * @apiName PutSingleReports
         * @apiGroup Reports
         * @apiDescription Use patch to partial update.
         *
         * @apiParam (Param) {String} id Report unique id.
         *
         * @apiParam (Body x-www) {String} name Name [min 3, max 150]
         * @apiParam (Body x-www) {String} field Any field describe in Create Doc
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
        .patch('/:id', authenticate(), PersistenceApp.patch)
        /**
         * @api {put} /reports/:id f. Full Update report
         * @apiName PatchSingleReports
         * @apiGroup Reports
         *
         * @apiParam (Param) {String} id Report unique id.
         *
         * @apiParam (Body x-www) {String} name Name [min 3, max 150]
         * @apiParam (Body x-www) {String} field Any field describe in Create Doc
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
         *        fields: {}
         *     }
         */
        .put('/:id', authenticate(), PersistenceApp.update)
        /**
         * @api {delete} /reports/:id g. Delete single report
         * @apiName DeleteSingleReports
         * @apiGroup Reports
         *
         * @apiParam (Param) {String} id Report unique id.
         *
         * @apiPermission JWT (Admin)
         * @apiHeader (Header) {String} Authorization JWT {Token}
         *
         * @apiError (Error) PermissionError Token don`t have permission
         * @apiError (Error) Unauthorized Invalid Token
         * @apiError (Error) NotFound Entity not exist
         *
         * @apiSuccessExample {json} Success-Response:
         *     HTTP/1.1 204 OK
         *     {}
         */
        .delete('/:id', authenticate(), PersistenceReport.remove)

        /**
         * Roles
         */

         /**
         * @api {post} /reports/:id/roles/ h. Add access Role
         * @apiName PostRoleReports
         * @apiGroup Reports
         *
         * @apiParam (Param) {String} id Report unique id.
         *
         * @apiParam (Body x-www) {String} name User/Team name
         * @apiParam (Body x-www) {String} [email] User/Team email
         * @apiParam (Body x-www) {Number} role Access Permission [1 = Read, 3 = Write, 7 = Admin]
         * @apiParam (Body x-www) {String} id User/Team Id
         * @apiParam (Body x-www) {String} refs Entity Type [users | teams | projects]
         *
         * @apiPermission JWT (Admin)
         * @apiHeader (Header) {String} Authorization JWT {Token}
         *
         * @apiError (Error) PermissionError Token don`t have permission
         * @apiError (Error) Unauthorized Invalid Token
         * @apiError (Error) NotFound Entity not exist
         *
         * @apiSuccessExample {json} Success-Response:
         *     HTTP/1.1 201 OK
         *     {}
         */
        .post('/:id/roles', authenticate(), AccessApp.create)
        /**
         * @api {put} /reports/:id/roles i. Update access role
         * @apiName PutRoleReports
         * @apiGroup Reports
         * @apiDescription Update all access roles, remember if you don´t send your access, after success you lose the access it´s
         *
         * @apiParam (Param) {String} id Report unique id.
         *
         * @apiParam (Body Raw) {Array} raw List with all roles
         * <br/>
         * <pre class="prettyprint language-json" data-type="json">
         * <code>[{
         * <br/>   "name": (String),
         * <br/>   "email": (String),
         * <br/>   "role": (Number), //'1 | 3 | 7'
         * <br/>   "id": (String),
         * <br/>   "refs": (String)
         * <br/>}]
         *  </code>
         * </pre>
         *
         * @apiPermission JWT (Admin)
         * @apiHeader (Header) {String} Authorization JWT {Token}
         *
         * @apiError (Error) PermissionError Token don`t have permission
         * @apiError (Error) Unauthorized Invalid Token
         * @apiError (Error) NotFound Entity not exist
         *
         * @apiSuccessExample {json} Success-Response:
         *     HTTP/1.1 202 OK
         *     {}
         */
        .put('/:id/roles/', authenticate(), AccessApp.update)
        /**
         * @api {put} /reports/:id/roles/:idu j. Update specific access role
         * @apiName PutSingleRoleReports
         * @apiGroup Reports
         * @apiDescription Update access level one role to one report
         *
         * @apiParam (Param) {String} id Report unique id.
         * @apiParam (Param) {String} idu User unique id.
         *
         * @apiParam (Body x-www) {String} field Any field describe to create role
         *
         * @apiPermission JWT (Admin)
         * @apiHeader (Header) {String} Authorization JWT {Token}
         *
         * @apiError (Error) PermissionError Token don`t have permission
         * @apiError (Error) Unauthorized Invalid Token
         * @apiError (Error) NotFound Entity not exist
         *
         * @apiSuccessExample {json} Success-Response:
         *     HTTP/1.1 202 OK
         *     {}
         */
        .put('/:id/roles/:idu', authenticate(), AccessApp.updateSingle)
        /**
         * @api {delete} /reports/:id/roles/:idu l. Delete one role
         * @apiName DeleteRoleReports
         * @apiGroup Reports
         * @apiDescription Delete unique role.
         *
         * @apiParam (Param) {String} id Report unique id.
         * @apiParam (Param) {String} idu User unique id.
         *
         * @apiPermission JWT (Admin)
         * @apiHeader (Header) {String} Authorization JWT {Token}
         *
         * @apiError (Error) PermissionError Token don`t have permission
         * @apiError (Error) Unauthorized Invalid Token
         * @apiError (Error) NotFound Entity not exist
         *
         * @apiSuccessExample {json} Success-Response:
         *     HTTP/1.1 204 OK
         *     {}
         */
        .delete('/:id/roles/:idu', authenticate(), AccessApp.remove);
};
