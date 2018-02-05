'use strict';

const authenticate = require('identity/middlewares/authenticate');
const Connections = require('../../entities/Connections');

const PersistenceConnection = require('../../applications/persistenceConnection')(Connections);
const PersistenceApp = require('core/applications/persistenceApplication')(Connections);
const Accessconnection = require('core/applications/accessApplication')(Connections);

module.exports = function (router) {

    router
    /**
     * @api {get} /connections a. List your connections
     * @apiName GetConnection
     * @apiGroup Connections
     *
     * @apiParam (Param) {Json} [query] Create a query to filters, the fields received some transformation.
     * <br/>
     * <pre class="prettyprint language-json" data-type="json">
     * <code>{
         * <br/>   "name": 'search by name',
         * <br/>   "provider": 'search by provider name, like (AWS, OpenStack)'
         * <br/>}
     *  </code>
     * </pre>
     * <br/><b>Connection don´t have modifications, only default regex filter:</b>
     * <br/><i>{alias} = {query into mongodb}</i>
     * <ul>
     *     <li>field is string the querie execute a regex research like "%filter%", EX: {'name': 'serv'}, It will return result with name 'services58' or '754services'.</li>
     * </ul>
     * @apiParam (Param) {String} [limit=20] Limit result.
     * @apiParam (Param) {String} [page=1] Show result by page.
     * @apiParam (Param) {String} [name] Filter by name (Exacly).
     * @apiParam (Param) {String} [provider] Filters by provider.
     * @apiParam (Param) {String} [dc_id] Filters by DC Id.
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
         * @api {get} /connections/count b. Count total connections
         * @apiName GetCountConnection
         * @apiGroup Connections
         *
         * @apiParam (Param) {String} [name] Filter by name (Exacly).
         * @apiParam (Param) {String} [provider] Filters by provider.
         * @apiParam (Param) {String} [dc_id] Filters by DC Id.
         * @apiParam (Param) {String} [field] Filter by any field with exacly value.
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
         * @api {get} /connections/:id c. Get single connection
         * @apiName GetSingleConnection
         * @apiGroup Connections
         *
         * @apiParam (Param) {String} id Connections unique id.
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
         * @api {post} /connections/ d. Create single connection
         * @apiName PostConnections
         * @apiGroup Connections
         *
         * @apiParam (Body x-www) {String} name Name [min 3, max 150]
         * @apiParam (Body x-www) {String} [url] Url source, normally used in OpenStack [max 250]
         * @apiParam (Body x-www) {String} [project] Project name, used in OpenStack [max 250]
         * @apiParam (Body x-www) {String} status Status [Enabled | Disabled]
         * @apiParam (Body x-www) {String} dc Datacenter name [max 150]
         * @apiParam (Body x-www) {String} dc_id Id Dc [ObjectId]
         * @apiParam (Body x-www) {String} provider Provider name (AWS, OpenStack)
         * @apiParam (Body x-www) {Array} regions Regions used for crawler [Array of string]
         * @apiParam (Body x-www) {Object} [owner_user] Owner user, used for clone owner and roles.
         * <br/>
         * <pre class="prettyprint language-json" data-type="json">
         * <code>{
         * <br/>   "name": (String),
         * <br/>   "role": (Number), [1 = read, 3 = write or 7 = admin]
         * <br/>   "email": (String),
         * <br/>   "refs": (String) ["users", "teams", "projects"]
         * <br/>}
         *  </code>
         * </pre>
         * @apiParam (Body x-www) {Object} [process] Process logs
         * <br/>
         * <pre class="prettyprint language-json" data-type="json">
         * <code>{
         * <br/>   "{key-name}": {
         * <br/>        state: (String) [success, warning, danger]
         * <br/>        msg:  (String)
         * <br/>    }
         * <br/>}
         *  </code>
         * </pre>
         * @apiParam (Body x-www) {Object} conn Credencials will be transform in JWT, a format object depends provider [beacause of transformation, this field not be updated]
         * <br/>
         * <pre class="prettyprint language-json" data-type="json">
         * <code>
         * <br/> //AWS
         * <br/>{
         * <br/>   "access": (String),
         * <br/>   "secret": (String)
         * <br/>}
         * <br/> //OpenStack
         * <br/>{
         * <br/>   "username": (String),
         * <br/>   "password": (String)
         * <br/>}
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
        .post('/', authenticate(), PersistenceConnection.create)
        /**
         * @api {patch} /connections/:id e. Update connection
         * @apiName PutSingleConnections
         * @apiGroup Connections
         * @apiDescription Use patch to partial update.
         *
         * @apiParam (Param) {String} id Connection unique id.
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
         * @api {put} /connections/:id f. Full Update connection
         * @apiName PatchSingleConnections
         * @apiGroup Connections
         *
         * @apiParam (Param) {String} id Connection unique id.
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
         * @api {delete} /connections/:id g. Delete single connection
         * @apiName DeleteSingleConnections
         * @apiGroup Connections
         *
         * @apiParam (Param) {String} id Connection unique id.
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
        .delete('/:id', authenticate(), PersistenceConnection.remove)
        /**
         * @api {put} /:id/task/:command h. Execute task
         * @apiName PutTaskSingleConnection
         * @apiGroup Connections
         *
         * @apiParam (Param) {String} id Connection unique id.
         * @apiParam (Param) {String} command Command name [server-list, dbs-list and etc]
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
        .put('/:id/task/:command', authenticate(), PersistenceConnection.task)


        /**
         * Roles
         */
        /**
         * @api {post} /connections/:id/roles/ i. Add access Role
         * @apiName PostRoleConnections
         * @apiGroup Connections
         *
         * @apiParam (Param) {String} id Connection unique id.
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
        .post('/:id/roles', authenticate(), Accessconnection.create)
        /**
         * @api {put} /connections/:id/roles j. Update access role
         * @apiName PutRoleConnections
         * @apiGroup Connections
         * @apiDescription Update all access roles, remember if you don´t send your access, after success you lose the access it´s
         *
         * @apiParam (Param) {String} id Connection unique id.
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
        .put('/:id/roles/', authenticate(), Accessconnection.update)
        /**
         * @api {put} /connections/:id/roles/:idu l. Update specific access role
         * @apiName PutSingleRoleConnections
         * @apiGroup Connections
         * @apiDescription Update access level one role to one application
         *
         * @apiParam (Param) {String} id Connection unique id.
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
        .put('/:id/roles/:idu', authenticate(), Accessconnection.updateSingle)
        /**
         * @api {delete} /connections/:id/roles/:idu m. Delete one role
         * @apiName DeleteRoleConnections
         * @apiGroup Connections
         * @apiDescription Delete unique role.
         *
         * @apiParam (Param) {String} id Connection unique id.
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
        .delete('/:id/roles/:idu', authenticate(), Accessconnection.remove);
};
