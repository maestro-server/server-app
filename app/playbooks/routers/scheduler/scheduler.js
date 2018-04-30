'use strict';

const authenticate = require('identity/middlewares/authenticate');
const Scheduler = require('../../entities/Scheduler');

const PersistenceApp = require('core/applications/persistenceApplication')(Scheduler);
const PersistenceAppScheduler = require('../../applications/persistenceScheduler')(Scheduler);

const AccessApp = require('core/applications/accessApplication')(Scheduler);

module.exports = function (router) {

    router
        /**
         * @api {get} /schedules a. List your schedule
         * @apiName List all active schedule, have a posibility to use filters, pagination, queries and etc.
         * @apiGroup Schedules
         *
         * @apiParam (Param) {Json} [query] Create a query to filters, the fields received some transformation.
         * <br/>
         * <pre class="prettyprint language-json" data-type="json">
         * <code>{
         * <br/>   "name": 'search by name',
         * <br/>   "period_type": 'search by type [interval|crontab]',
         * <br/>   "method": 'search by method used [GET|POST|PUT|DELETE]',
         * <br/>   "task": 'search by task [webhook|connections|jobs]',
         * <br/>   "total_run_count": 'search by total runned',
         * <br/>   "max_run_count": 'search by max run allowed'
         * <br/>}
         *  </code>
         * </pre>
         * <br/><b>Schedule don´t have modifications, only default regex filter:</b>
         * <br/><i>{alias} = {query into mongodb}</i>
         * <ul>
         *     <li>field is string the querie execute a regex research like "%filter%", EX: {'name': 'serv'}, It will return result with name 'services58' or '754services'.</li>
         * </ul>
         * @apiParam (Param) {String} [limit=20] Limit result.
         * @apiParam (Param) {String} [page=1] Show result by page.
         * @apiParam (Param) {String} [name] Filter by name (Exacly).
         * @apiParam (Param) {String} [status] Filter by status (success, error, process, warning).
         * @apiParam (Param) {String} [context] Filter by context
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
         * @api {get} /schedules/count b. Count total schedules
         * @apiName Get total schedules.
         * @apiGroup Schedules
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
         * @api {get} /schedules/:id c. Get single schedule
         * @apiName Get single schedule.
         * @apiGroup Schedules
         *
         * @apiParam (Param) {String} id Schedule unique id.
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
         * @api {post} /schedules/ d. Create single schedule
         * @apiName PostSchedules
         * @apiGroup Schedules
         *
         * @apiParam (Body x-www) {String} name Name [min 3, max 30]
         * @apiParam (Body x-www) {String} [description] Description
         * @apiParam (Body x-www) {String} component Component name [min 3, max 30]
         * @apiParam (Body x-www) {String} schedule Schedule category (pivot, general)
         * @apiParam (Body x-www) {Array} [columns] List of columns mapped, used to create view schedule.
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
        .post('/', authenticate(), PersistenceApp.create)
        /**
         * @api {put} /schedules/:id f. Full Update schedule
         * @apiName PatchSingleSchedules
         * @apiGroup Schedules
         *
         * @apiParam (Param) {String} id Schedule unique id.
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
         * @api {patch} /schedules/:id e. Update schedule
         * @apiName PutSingleSchedules
         * @apiGroup Schedules
         * @apiDescription Use patch to partial update.
         *
         * @apiParam (Param) {String} id Schedule unique id.
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
         * @api {delete} /schedules/:id g. Delete single schedule
         * @apiName DeleteSingleSchedules
         * @apiGroup Schedules
         *
         * @apiParam (Param) {String} id Schedule unique id.
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
        .delete('/:id', authenticate(), PersistenceApp.remove)

        .post('/template', authenticate(), PersistenceAppScheduler.createTemplate)

        /**
         * Roles
         */
                 /**
         * @api {post} /schedules/:id/roles/ h. Add access Role
         * @apiName PostRoleSchedules
         * @apiGroup Schedules
         *
         * @apiParam (Param) {String} id Schedule unique id.
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
         * @api {put} /schedules/:id/roles i. Update access role
         * @apiName PutRoleSchedules
         * @apiGroup Schedules
         * @apiDescription Update all access roles, remember if you don´t send your access, after success you lose the access it´s
         *
         * @apiParam (Param) {String} id Schedule unique id.
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
         * @api {put} /schedules/:id/roles/:idu j. Update specific access role
         * @apiName PutSingleRoleSchedules
         * @apiGroup Schedules
         * @apiDescription Update access level one role to one schedule
         *
         * @apiParam (Param) {String} id Schedule unique id.
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
         * @api {delete} /schedules/:id/roles/:idu l. Delete one role
         * @apiName DeleteRoleSchedules
         * @apiGroup Schedules
         * @apiDescription Delete unique role.
         *
         * @apiParam (Param) {String} id Schedule unique id.
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
