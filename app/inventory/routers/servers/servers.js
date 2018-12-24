'use strict';

const authenticate = require('identity/middlewares/authenticate');
const Servers = require('../../entities/Servers');

const PersistenceApp = require('core/applications/persistenceApplication')(Servers);
const PersistenceAudit = require('core/applications/persistenceAudit')(Servers);
const PersistenceAppServers = require('../../applications/persistenceServers')(Servers);

const AccessApp = require('core/applications/accessApplication')(Servers);

module.exports = function (router) {

    router
    /**
     *
     * @api {get} / Ping
     * @apiName GetPing
     * @apiGroup Ping
     *
     *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
         *        app: (String),
         *        description: (String),
         *        version: (Float),
         *        api_timeout: (Number)
         *     }
     */


     /** @api {get} /servers a. List your servers
     * @apiName GetServer
     * @apiGroup Servers
     *
     * @apiParam (Param) {Json} [query] Create a query to filters, the fields received some transformation.
     * <br/>
     * <pre class="prettyprint language-json" data-type="json">
     * <code>{
         * <br/>   "name": 'search by name',
         * <br/>   "datacenters": 'search by dc name'
         * <br/>}
     *  </code>
     * </pre>
     * <br/><b>The list modification is:</b>
     * <br/><i>{alias} = {query on mongodb}</i>
     * <ul>
     *     <li>id = _id</li>
     *     <li>datacenters = datacenters.name</li>
     *     <li>os = os.base</li>
     *     <li>auth = auth.type</li>
     *     <li>user = auth.username</li>
     *     <li>field is string the querie execute a regex research like "%filter%", EX: {'name': 'serv'}, It will return servers with name 'services58' or '754services'.</li>
     * </ul>
     * @apiParam (Param) {String} [limit=20] Limit result.
     * @apiParam (Param) {String} [page=1] Show result by page.
     * @apiParam (Param) {String} [name] Filter by name (Exacly).
     * @apiParam (Param) {String} [environment] Filters by env (Production, Development).
     * @apiParam (Param) {String} [role] Filters by role (Application, Database, etc).
     * @apiParam (Param) {String} [cpu] Filter by CPU.
     * @apiParam (Param) {String} [memory] Filter by Memory.
     * @apiParam (Param) {String} [ipv4_private] Filter by private IP.
     * @apiParam (Param) {String} [ipv4_public] Filter by public IP.
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
         * @api {get} /servers/count b. Count total servers
         * @apiName GetCountServer
         * @apiGroup Servers
         *
         * @apiParam (Param) {String} [name] Filter by name (Exacly).
         * @apiParam (Param) {String} [environment] Filters by env (Production, Development).
         * @apiParam (Param) {String} [role] Filters by role (Application, Database, etc).
         * @apiParam (Param) {String} [cpu] Filter by CPU.
         * @apiParam (Param) {String} [memory] Filter by Memory.
         * @apiParam (Param) {String} [ipv4_private] Filter by private IP.
         * @apiParam (Param) {String} [ipv4_public] Filter by public IP.
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
         * @api {get} /servers/:id c. Get single server
         * @apiName GetSingleServer
         * @apiGroup Servers
         *
         * @apiParam (Param) {String} id Server unique id.
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
         * @api {post} /servers/ d. Create single server
         * @apiName PostServers
         * @apiGroup Servers
         *
         * @apiParam (Body x-www) {String} hostname Hostname [min 3, max 30]
         * @apiParam (Body x-www) {String} ipv4_private IP Private [min 3, max 30]
         * @apiParam (Body x-www) {String} ipv4_public IP Public [min 3, max 30]
         * @apiParam (Body x-www) {Object} os OS
         * <br/>
         * <pre class="prettyprint language-json" data-type="json">
         * <code>{
         * <br/>   "base": (String), [max 40]
         * <br/>   "dist": (String),
         * <br/>   "version": (String)
         * <br/>}
         *  </code>
         * </pre>
         * @apiParam (Body x-www) {Number} cpu CPU in GBs [positive max 1024]
         * @apiParam (Body x-www) {Number} memory Memory in GBs [positive max 1024]
         * @apiParam (Body x-www) {Array} storage Storage
         * <br/>
         * <pre class="prettyprint language-json" data-type="json">
         * <code>[{
         * <br/>   "name": (String), [max 100]
         * <br/>   "size": (Number),
         * <br/>   "root": (String) [max 10]
         * <br/>   "status": (String) [max 10]
         * <br/>   "volume_id": (String) [max 35]
         * <br/>   "attach_time": (String) [max 30]
         * <br/>   "delete_termination": (Any)
         * <br/>}]
         *  </code>
         * </pre>
         * @apiParam (Body x-www) {Array} services List of Services [Objects]
         * <br/>
         * <pre class="prettyprint language-json" data-type="json">
         * <code>[{
         * <br/>   "name": (String), [max 100]
         * <br/>   "status": (Number),
         * <br/>   "version": (String) [max 10]
         * <br/>   "configs": (String) [max 35]
         * <br/>   "setup": (String) [max 30]
         * <br/>}]
         *  </code>
         * </pre>
         * @apiParam (Body x-www) {String} role Server responsability ['Application', 'Cache', 'Container', 'Database', 'File', 'Loadbalance', 'Monitoring', 'NAT', 'Proxy', 'SMTP', 'VPN', 'Standard']
         * @apiParam (Body x-www) {Array} auth Methods to auth [Array of Objects]
         * <br/>
         * <pre class="prettyprint language-json" data-type="json">
         * <code>[{
         * <br/>   "name": (String), [max 100]
         * <br/>   "type": (String), ['PKI', 'AD', 'LDAP', 'Password']
         * <br/>   "username": (String) [max 100]
         * <br/>   "key": (String) [max 100]
         * <br/>}]
         *  </code>
         * </pre>
         * @apiParam (Body x-www) {Array} [applications List of applications, [Array of Objects]
         * <br/>
         * <pre class="prettyprint language-json" data-type="json">
         * <code>[{
         * <br/>   "_id": (String), //application entities
         * <br/>   "name": (String),
         * <br/>   "family": (String)
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
         * @apiParam (Body x-www) {String} [environment] Envronment, ['Production', 'Staging', 'Development', 'UTA', 'Training', 'SandBox']
         * @apiParam (Body x-www) {String} [status] Status ['Active', 'Avaliable', 'Stopped']
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
         * @api {patch} /servers/:id e. Update server
         * @apiName PutSingleServers
         * @apiGroup Servers
         * @apiDescription Use patch to partial update.
         *
         * @apiParam (Param) {String} id Server unique id.
         *
         * @apiParam (Body x-www) {String} hostname Hostname [min 3, max 150]
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
         * @api {put} /servers/:id f. Full Update server
         * @apiName PatchSingleServers
         * @apiGroup Servers
         *
         * @apiParam (Param) {String} id Server unique id.
         *
         * @apiParam (Body x-www) {String} hostname Hostname [min 3, max 150]
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
         * @api {delete} /servers/:id g. Delete single server
         * @apiName DeleteSingleServers
         * @apiGroup Servers
         *
         * @apiParam (Param) {String} id Server unique id.
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
         * @api {get} /servers/:id/audit h. Get changed history
         * @apiName GetAuditServer
         * @apiGroup Servers
         *
         * @apiParam (Param) {String} id Server unique id.
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
         * @api {post} /servers/:id/roles/ i. Add access Role
         * @apiName PostRoleServers
         * @apiGroup Servers
         *
         * @apiParam (Param) {String} id Server unique id.
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
         * @api {put} /servers/:id/roles j. Update access role
         * @apiName PutRoleServers
         * @apiGroup Servers
         * @apiDescription Update all access roles, remember if you don´t send your access, after success you lose the access it´s
         *
         * @apiParam (Param) {String} id Server unique id.
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
         * @api {put} /servers/:id/roles/:idu l. Update specific access role
         * @apiName PutSingleRoleServers
         * @apiGroup Servers
         * @apiDescription Update access level one role to one server
         *
         * @apiParam (Param) {String} id Server unique id.
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
         * @api {delete} /servers/:id/roles/:idu m. Delete one role
         * @apiName DeleteRoleServers
         * @apiGroup Servers
         * @apiDescription Delete unique role.
         *
         * @apiParam (Param) {String} id Server unique id.
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
