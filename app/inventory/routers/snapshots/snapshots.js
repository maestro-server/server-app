'use strict';

const authenticate = require('identity/middlewares/authenticate');
const Snapshots = require('../../entities/Snapshots');
const PersistenceApp = require('core/applications/persistenceApplication')(Snapshots);
const PersistenceAudit = require('core/applications/persistenceAudit')(Snapshots);
const PersistenceAppServers = require('../../applications/persistenceServers')(Snapshots);
const AccessApp = require('core/applications/accessApplication')(Snapshots);

module.exports = function (router) {

    router
    /**
     * @api {get} /snapshots a. List your snapshots
     * @apiName GetSnapshot
     * @apiGroup Snapshots
     *
     * @apiParam (Param) {Json} [query] Create a query to filters, the fields received some transformation.
     * <br/>
     * <pre class="prettyprint language-json" data-type="json">
     * <code>{
         * <br/>   "name": 'search by name'
         * <br/>}
     *  </code>
     * </pre>
     * <br/><b>Snapshots don´t have modifications, only default regex filter:</b>
     * <br/><i>{alias} = {query on mongodb}</i>
     * <ul>
     *     <li>field is string the querie execute a regex research like "%filter%", EX: {'name': 'serv'}, It will return result with name 'services58' or '754services'.</li>
     * </ul>
     * @apiParam (Param) {String} [limit=20] Limit result.
     * @apiParam (Param) {String} [page=1] Show result by page.
     * @apiParam (Param) {String} [name] Filter by name (Exacly).
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
        .get('/', authenticate(), PersistenceAppServers.find)
        /**
         * @api {get} /snapshots/count b. Count total snapshots
         * @apiName GetTotalSnapshot
         * @apiGroup Snapshots
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
         * @api {get} /snapshots/:id c. Get single snapshot
         * @apiName GetSingleSnapshot
         * @apiGroup Snapshots
         *
         * @apiParam (Param) {String} id Snapshot unique id.
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
         * @api {post} /snapshots/ d. Create single image
         * @apiName PostSnapshots
         * @apiGroup Snapshots
         *
         *
         * @apiParam (Body x-www) {String} name Name [min 3, max 150]
         * @apiParam (Body x-www) {Array} [tags List of tags, [Array of Objects]
         * <br/>
         * <pre class="prettyprint language-json" data-type="json">
         * <code>[{
         * <br/>   "key": (String),
         * <br/>   "value": (String)
         * <br/>}]
         *  </code>
         * </pre>
         * @apiParam (Body x-www) {String} unique_id Unique name, normally use in Databases
         * @apiParam (Body x-www) {String} [status] Status, [Active, Avaliable, Stopped]
         * @apiParam (Body x-www) {Object} [datacenters] Datacenter, normally used in third services
         * <br/>
         * <pre class="prettyprint language-json" data-type="json">
         * <code>{
         * <br/>   "_id": (String),
         * <br/>   "provider": (String),
         * <br/>   "name": (String)
         * <br/>}
         *  </code>
         * </pre>
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
         * @api {patch} /snapshots/:id e. Update snapshot
         * @apiName PutSingleSnapshots
         * @apiGroup Snapshots
         * @apiDescription Use patch to partial update.
         *
         * @apiParam (Param) {String} id Snapshot unique id.
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
         * @api {put} /snapshots/:id f. Full Update snapshot
         * @apiName PatchSingleSnapshots
         * @apiGroup Snapshots
         *
         * @apiParam (Param) {String} id Snapshot unique id.
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
         * @api {delete} /snapshots/:id g. Delete single snapshot
         * @apiName DeleteSingleSnapshots
         * @apiGroup Snapshots
         *
         * @apiParam (Param) {String} id Snapshot unique id.
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

        /**
         * @api {get} /snapshots/:id/audit h. Get changed history
         * @apiName GetAuditSnapshots
         * @apiGroup Snapshots
         *
         * @apiParam (Param) {String} id Snapshot unique id.
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
         *        "found": <int>,
         *        "limit": <int>,
         *        "total_pages": <int>,
         *        "current_page": <int>,
         *        "items": []
         *     }
         */
        .get('/:id/audit', authenticate(), PersistenceAudit.find)

        /**
         * Roles
         */
        /**
         * @api {post} /snapshots/:id/roles/ i. Add access Role
         * @apiName PostRoleSnapshots
         * @apiGroup Snapshots
         *
         * @apiParam (Param) {String} id Snapshot unique id.
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
         * @api {put} /snapshots/:id/roles j. Update access role
         * @apiName PutRoleSnapshots
         * @apiGroup Snapshots
         * @apiDescription Update all access roles, remember if you don´t send your access, after success you lose the access it´s
         *
         * @apiParam (Param) {String} id Snapshot unique id.
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
         * @api {put} /snapshots/:id/roles/:idu l. Update specific access role
         * @apiName PutSingleRoleSnapshots
         * @apiGroup Snapshots
         * @apiDescription Update access level one role to one snapshot
         *
         * @apiParam (Param) {String} id Snapshot unique id.
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
         *     HTTP/1.1 202 OK
         *     {}
         */
        .put('/:id/roles/:idu', authenticate(), AccessApp.updateSingle)
        /**
         * @api {delete} /snapshots/:id/roles/:idu o. Delete one role
         * @apiName DeleteRoleSnapshots
         * @apiGroup Snapshots
         * @apiDescription Delete unique role.
         *
         * @apiParam (Param) {String} id Snapshot unique id.
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
