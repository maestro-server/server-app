'use strict';

const authenticate = require('identity/middlewares/authenticate');

const Client = require('../../entities/Clients');
const System = require('../../entities/System');

const PersistenceApp = require('core/applications/persistenceApplication')(Client);
const PersistenceAudit = require('core/applications/persistenceAudit')(Client);
const PersistenceRelation = require('../../applications/persistenceRelationSystem')(System)(Client);

const AccessApp = require('core/applications/accessApplication')(Client);

module.exports = function (router) {

    router
    /**
     * @api {get} /clients a. List your clients
     * @apiName GetClient
     * @apiGroup Clients
     *
     * @apiParam (Param) {Json} [query] Create a query to filters, the fields received some transformation.
     * <br/>
     * <pre class="prettyprint language-json" data-type="json">
     * <code>{
         * <br/>   "name": 'search by name',
         * <br/>   "lclient": 'search by client name' //used in simple flatted querie
         * <br/>}
     *  </code>
     * </pre>
     * <br/><b>The list modification is:</b>
     * <br/><i>{alias} = {query on mongodb}</i>
     * <ul>
     *     <li>lclient = clients.name</li>
     *     <li>contacts = upperCase(contacts)</li>
     *     <li>field is string the querie execute a regex research like "%filter%", EX: {'name': 'serv'}, It will return clients with name 'services58' or '754services'.</li>
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
    .get('/', authenticate(), PersistenceApp.find)
    /**
     * @api {get} /clients/count b. Count total clients
     * @apiName GetCountClient
     * @apiGroup Clients
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
     * @api {get} /clients/:id c. Get single client
     * @apiName GetSingleClient
     * @apiGroup Clients
     *
     * @apiParam (Param) {String} id Client unique id.
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
     * @api {post} /clients/ d. Create single client
     * @apiName PostClients
     * @apiGroup Clients
     *
     * @apiParam (Body x-www) {String} name Name [min 3, max 150]
     * @apiParam (Body x-www) {String} [description] Short description [max 800]
     * @apiParam (Body x-www) {Array} [contacts] Contact list
     * <br/>
     * <pre class="prettyprint language-json" data-type="json">
     * <code>[{
         * <br/>   "channel": (String),
         * <br/>   "value": (String)
         * <br/>}]
     *  </code>
     * </pre>
     * @apiParam (Body x-www) {Array} [tags List of tags, [Array of Objects]
     * <br/>
     * <pre class="prettyprint language-json" data-type="json">
     * <code>[{
         * <br/>   "key": (String),
         * <br/>   "value": (String)
         * <br/>}]
     *  </code>
     * </pre>
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
     * @api {patch} /clients/:id e. Update client
     * @apiName PutSingleClients
     * @apiGroup Clients
     * @apiDescription Use patch to partial update.
     *
     * @apiParam (Param) {String} id Client unique id.
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
     * @api {put} /clients/:id f. Full Update client
     * @apiName PatchSingleClients
     * @apiGroup Clients
     *
     * @apiParam (Param) {String} id Client unique id.
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
     * @api {delete} /clients/:id g. Delete single client
     * @apiName DeleteSingleClients
     * @apiGroup Clients
     *
     * @apiParam (Param) {String} id Client unique id.
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
     * @api {get} /clients/:id/audit h. Get changed history
     * @apiName GetAuditClients
     * @apiGroup Clients
     *
     * @apiParam (Param) {String} id Clients unique id.
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
     * @api {post} /clients/:id/roles/ i. Add access Role
     * @apiName PostRoleClient
     * @apiGroup Clients
     *
     * @apiParam (Param) {String} id Client unique id.
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
     * @api {put} /clients/:id/roles j. Update access role
     * @apiName PutRoleClient
     * @apiGroup Clients
     * @apiDescription Update all access roles, remember if you don´t send your access, after success you lose the access it´s
     *
     * @apiParam (Param) {String} id Client unique id.
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
     * @api {put} /clients/:id/roles/:idu l. Update specific access role
     * @apiName PutSingleRoleClient
     * @apiGroup Clients
     * @apiDescription Update access level one role to one application
     *
     * @apiParam (Param) {String} id Client unique id.
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
     * @api {delete} /clients/:id/roles/:idu m. Delete one role
     * @apiName DeleteRoleClient
     * @apiGroup Clients
     * @apiDescription Delete unique role.
     *
     * @apiParam (Param) {String} id Client unique id.
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
    .delete('/:id/roles/:idu', authenticate(), AccessApp.remove)

    /**
     * System
     */
    /**
     * @api {patch} /clients/:id/system n. Add system on client
     * @apiName PatchClientSystem
     * @apiGroup Clients
     *
     * @apiParam (Param) {String} id Client unique id.
     *
     * @apiParam (www-body) {Array} id List of system ids [Array of strings].
     *
     * @apiPermission JWT (Write | Admin)
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
    .patch('/:id/system', authenticate(), PersistenceRelation.create)
    /**
     * @api {get} /clients/:id/system o. Delete system on client
     * @apiName DeleteClientSystem
     * @apiGroup Clients
     *
     * @apiParam (Param) {String} id Client unique id.
     *
     * @apiParam (www-body) {Array} id List of system ids [Array of strings].
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
    .delete('/:id/system', authenticate(), PersistenceRelation.remove);
};
