'use strict';

const authenticate = require('identity/middlewares/authenticate');
const Application = require('../../entities/Application');
const PersistenceApp = require('core/applications/persistenceApplication')(Application);
const PersistenceAppApplications = require('../../applications/persistenceApplications')(Application);
const AccessApp = require('core/applications/accessApplication')(Application);

module.exports = function (router) {

    router
        /**
         * @api {get} /applications a. List your applications
         * @apiName GetApplication
         * @apiGroup Applications
         *
         * @apiParam (Param) {Json} [query] Create a query to filters, the fields received some transformation.
         * <br/>
         * <pre class="prettyprint language-json" data-type="json">
         * <code>{
         * <br/>   "name": 'search by name',
         * <br/>   "lsysem": 'search by system name'
         * <br/>}
         *  </code>
         * </pre>
         * <br/><b>The list modification is:</b>
         * <br/><i>{alias} = {query into mongodb}</i>
         * <ul>
         *     <li>lsystem = system.name</li>
         *     <li>role = role.role</li>
         *     <li>language = upperCase(language)</li>
         *     <li>provider = upperCase(language)</li>
         *     <li>environment = upperCase(language)</li>
         *     <li>field is string the querie execute a regex research like "%filter%", EX: {'name': 'serv'}, It will return applications with name 'services58' or '754services'.</li>
         * </ul>
         * @apiParam (Param) {String} [limit=20] Limit result.
         * @apiParam (Param) {String} [page=1] Show result by page.
         * @apiParam (Param) {String} [name] Filter by name (Exacly).
         * @apiParam (Param) {String} [servers] Filters by id server.
         * @apiParam (Param) {String} [field] Filter by any field with exacly value.
         *
         * @apiPermission JWT (Read | Write | Admin)
         * @apiHeader (Header) {String} Authorization JWT {Token}
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
        .get('/', authenticate(), PersistenceAppApplications.findApplications)
        /**
         * @api {get} /applications/count b. Count total apps
         * @apiName GetCountApplication
         * @apiGroup Applications
         *
         * @apiParam (Param) {String} [name] Filter by name (Exacly).
         * @apiParam (Param) {String} [servers] Filters by id server.
         * @apiParam (Param) {String} [field] Filter by exacly value.
         *
         * @apiPermission JWT (Read | Write | Admin)
         * @apiHeader (Header) {String} Authorization JWT {Token}
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
         * @api {get} /applications/:id c. Get single app
         * @apiName GetSingleApplication
         * @apiGroup Applications
         *
         * @apiParam (Param) {String} id Application unique id.
         *
         * @apiPermission JWT (Read | Write | Admin)
         * @apiHeader (Header) {String} Authorization JWT {Token}
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
         * @api {post} /applications/ d. Create single app
         * @apiName PostApplication
         * @apiGroup Applications
         *
         *
         * @apiParam (Body x-www) {String} name Name [min 3, max 150]
         * @apiParam (Body x-www) {String} [description] Short description [max 800]
         * @apiParam (Body x-www) {Array} [servers] List of ids servers [Array of Ids]
         * @apiParam (Body x-www) {Array} [targets] List of ids servers [Array of Ids]
         * @apiParam (Body x-www) {Boolean} [own=0] Resposability, 0 = Service installed in own servers, 1 - Third service
         * @apiParam (Body x-www) {Object} role Specification
         * <br/>
         * <pre class="prettyprint language-json" data-type="json">
         * <code>"role": {
         * <br/>   "role": (String), //'Application, Worker, Job, testing, Standard'
         * <br/>   "endpoint": (String),
         * <br/>   "command": (String), //'this app needs a command to start'
         * <br/>   "path": (String), //'location'
         * <br/>   "description": (String)
         * <br/>}
         *  </code>
         * </pre>
         * @apiParam (Body x-www) {String} [language] Language, used only in Bussiness Application [NodeJs, Java, Python and etc]
         * @apiParam (Body x-www) {String} [provider] Service name [ELB, Google Cloud Containers, etc]
         * @apiParam (Body x-www) {String} [cluster] If this app run in cluster (No, Master/Slave, 12 Factor, ZooKeeper, Leader election)
         * @apiParam (Body x-www) {String} [dataguard] Used only for Oracle DB. Type of dataguard
         * @apiParam (Body x-www) {String} [storage_types] Used only for Oracle DB. How Oracle DB manage space in disk
         * @apiParam (Body x-www) {Array}  [asm_groups] Used only for Oracle DB. If use ASM, name of groups. [Array of strings]
         * @apiParam (Body x-www) {String} [pdbs] Used only for Oracle DB. If use Containers DB. [Array of strings]
         * @apiParam (Body x-www) {String} [crs_version] Used only for Oracle DB.
         * @apiParam (Body x-www) {Object} [deploy] Deploy methods:
         * <br/>
         * <pre class="prettyprint language-json" data-type="json">
         * <code>"deploy": {
         * <br/>   "type": (String), //'GIT, FTP, Etc'
         * <br/>   "provider": (String), //'Github, BitBucket'
         * <br/>   "notes": (String)
         * <br/>}
         *  </code>
         * </pre>
         * @apiParam (Body x-www) {String} [type] Type of application [min 3, max 150]
         * @apiParam (Body x-www) {String} [modal] use only in Databases, especificy database [oracle, mysql, postgres, etc] [max 30]
         * @apiParam (Body x-www) {Array} [tags List of tags, [Array of Objects]
         * <br/>
         * <pre class="prettyprint language-json" data-type="json">
         * <code>[{
         * <br/>   "key": (String),
         * <br/>   "value": (String)
         * <br/>}]
         *  </code>
         * </pre>
         * @apiParam (Body x-www) {String} [unique_id] Unique name, normally use in Databases
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
         * @apiParam (Body x-www) {String} [environment] Envronment, ['Production', 'Staging', 'Development', 'UTA', 'Training', 'SandBox']
         * @apiParam (Body x-www) {String} [family=Application] Family, ['Application', 'Loadbalance', 'Broker', 'Database', 'Serverless', 'Serveless', 'ApiGateway', 'ContainerOrchestration', 'Cache', 'CDN', 'ObjectStorage', 'Monitor', 'Logs', 'SMTP', 'ServiceDiscovery', 'VPN', 'CI/CD', 'DNS', 'Repository', 'Auth', 'NAS']
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
         * @api {patch} /applications/:id e. Update app
         * @apiName PutSingleApplication
         * @apiGroup Applications
         * @apiDescription Use patch to partial update.
         *
         * @apiParam (Param) {String} id Application unique id.
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
         * @api {put} /applications/:id f. Full Update app
         * @apiName PatchSingleApplication
         * @apiGroup Applications
         *
         * @apiParam (Param) {String} id Application unique id.
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
         * @api {delete} /applications/:id g. Delete single app
         * @apiName DeleteSingleApplication
         * @apiGroup Applications
         *
         * @apiParam (Param) {String} id Application unique id.
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
         * Roles
         */
        /**
         * @api {post} /applications/:id/roles/ h. Add access Role
         * @apiName PostRoleApp
         * @apiGroup Applications
         *
         * @apiParam (Param) {String} id Application unique id.
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
         * @api {put} /applications/:id/roles i. Update access role
         * @apiName PutRoleApp
         * @apiGroup Applications
         * @apiDescription Update all access roles, remember if you don´t send your access, after success you lose the access it´s
         *
         * @apiParam (Param) {String} id Application unique id.
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
         * @api {put} /applications/:id/roles/:idu j. Update specific access role
         * @apiName PutSingleRoleApp
         * @apiGroup Applications
         * @apiDescription Update access level one role to one application
         *
         * @apiParam (Param) {String} id Application unique id.
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
         * @api {delete} /applications/:id/roles/:idu l. Delete one role
         * @apiName DeleteRoleApp
         * @apiGroup Applications
         * @apiDescription Delete unique role.
         *
         * @apiParam (Param) {String} id Application unique id.
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
