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
         * <br/>   "period_type": 'search by type [interval|cron]',
         * <br/>   "method": 'search by method used [GET|POST|PUT|DELETE]',
         * <br/>   "task": 'search by task [webhook|connections|jobs]',
         * <br/>   "total_run_count": 'search by total runned',
         * <br/>}
         * </code>
         * </pre>
         * <br/><b>Schedule don´t have modifications, only default regex filter:</b>
         * <br/><i>{alias} = {query into mongodb}</i>
         * <ul>
         *     <li>field is string the querie execute a regex research like "%filter%", EX: {'name': 'serv'}, It will return result with name 'services58' or '754services'.</li>
         * </ul>
         * @apiParam (Param) {String} [limit=20] Limit result.
         * @apiParam (Param) {String} [page=1] Show result by page.
         * @apiParam (Param) {String} [name] Filter by name (Exacly).
         * @apiParam (Param) {String} [task] Filter by task (webhook, connections, jobs).
         * @apiParam (Param) {String} [period_type] Filter by type (interval, cron)
         * @apiParam (Param) {String} [method] Filter by method (get, post, put, delete)
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
        .get('/', authenticate(), PersistenceAppScheduler.find)
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
         * @api {get} /schedules/:id/events d. Get all events
         * @apiName Get events of schedule.
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
         *        roles: []
         *        owner: []
         *        _links: {}
         *     }
         */
        .get('/:id/events', authenticate(), PersistenceAppScheduler.findEvents)
        /**
         * @api {post} /schedules/ e. Create single schedule
         * @apiName PostSchedules
         * @apiGroup Schedules
         *
         * @apiParam (Body x-www) {String} name Name [min 3, max 30]
         * @apiParam (Body x-www) {String} task Task (webhook, connections, jobs)
         * @apiParam (Body x-www) {String} period_type Choose one period (interval, cron)
         * @apiParam (Body x-www) {String} method HTTP method (get, post, put, delete)
         * @apiParam (Body x-www) {Array} [args] Args
         * <code>[
         * <br/>   "key": 'name',
         * <br/>   "value": 'value'
         * <br/>]
         * </code>
         * @apiParam (Body x-www) {Object} [kwargs] Scheduler configuration
         * @apiParam (Body x-www) {Array} [chain] Chain schedulers
         * <code>{
         * <br/>   "name": 'name',
         * <br/>   "_id": 'id scheduler',
         * <br/>   "countdown": 'wait time before execute'
         * <br/>}
         * </code>
         * @apiParam (Body x-www) {Object} [link] Detail of Modules
         * <code>{
         * <br/>   "name": 'name',
         * <br/>   "provider": 'provider (AWS)',
         * <br/>   "_id": 'refs id, used by modules',
         * <br/>   "task": 'search by task [webhook|connections|jobs]'
         * <br/>}
         * </code>
         * @apiParam (Body x-www) {String} [_cls] Internal Crontoller [PeriodTask]
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
         * @api {patch} /schedules/:id g. Update schedule
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
         * @api {delete} /schedules/:id h. Delete single schedule
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
        .delete('/:id', authenticate(), PersistenceAppScheduler.remove)
        /**
         * @api {post} /schedules/template i. Create a template scheduler
         * @apiName PostTemplateSchedules
         * @apiGroup Schedules
         *
         * @apiParam (Body x-www) {String} name Name [min 3, max 30]
         * @apiParam (Body x-www) {String} _id Id [Module id]
         * @apiParam (Body x-www) {String} provider Provider name [AWS, OpenStack]
         * @apiParam (Body x-www) {String} refs Module name [connections]
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
        .post('/template', authenticate(), PersistenceAppScheduler.createTemplate)

        /**
         * Roles
         */
                 /**
         * @api {post} /schedules/:id/roles/ j. Add access Role
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
         * @api {put} /schedules/:id/roles l. Update access role
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
         * @api {put} /schedules/:id/roles/:idu m. Update specific access role
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
         * @api {delete} /schedules/:id/roles/:idu n. Delete one role
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
