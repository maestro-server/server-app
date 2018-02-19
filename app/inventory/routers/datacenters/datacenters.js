'use strict';

const authenticate = require('identity/middlewares/authenticate');
const Datacenter = require('../../entities/Datacenter');
const Servers = require('../../entities/Servers');

const PersistenceApp = require('core/applications/persistenceApplication')(Datacenter);
const SyncerApp = require('core/applications/relationsApplication')()()(Servers)(Datacenter);

const AccessApp = require('core/applications/accessApplication')(Datacenter);

module.exports = function (router) {

    router
    /**
     * @api {get} /datacenters a. List your datacenters
     * @apiName GetDatacenter
     * @apiGroup Datacenters
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
     * <br/><b>Datacenters don´t have modifications, only default regex filter:</b>
     * <br/><i>{alias} = {query into mongodb}</i>
     * <ul>
     *     <li>field is string the querie execute a regex research like "%filter%", EX: {'name': 'serv'}, It will return result with name 'services58' or '754services'.</li>
     * </ul>
     * @apiParam (Param) {String} [limit=20] Limit result.
     * @apiParam (Param) {String} [page=1] Show result by page.
     * @apiParam (Param) {String} [name] Filter by name (Exacly).
     * @apiParam (Param) {String} [provider] Filters by provider.
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
         * @api {get} /datacenters/count b. Count total dcs
         * @apiName GetCountDatacenter
         * @apiGroup Datacenters
         *
         * @apiParam (Param) {String} [name] Filter by name (Exacly).
         * @apiParam (Param) {String} [provider] Filters by provider.
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
         * @api {get} /datacenters/:id c. Get single dc
         * @apiName GetCountDatacenter
         * @apiGroup Datacenters
         *
         * @apiParam (Param) {String} id Datacenter unique id.
         *
         * @apiPermission JWT
         * @apiHeader (Auth) {String} Authorization JWT {Token}
         *
         * @apiError (Error) PermissionError Token don´t have permission
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
         * @api {post} /datacenters/ d. Create single datacenter
         * @apiName PostDatacenters
         * @apiGroup Datacenters
         *
         * @apiParam (Body x-www) {String} name Name [min 3, max 30]
         * @apiParam (Body x-www) {String} provider Provider name (AWS, OpenStack)
         * @apiParam (Body x-www) {Array} regions Regions avaliable [Array of string]
         * @apiParam (Body x-www) {Array} [zones] Zones avaliable [Array of strings]
         * @apiParam (Body x-www) {Number} [servers_count] Total servers in DC, used /syncer
         * @apiParam (Body x-www) {Boolean} [sucessed] If DC have any connection, its true
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
         * @api {patch} /datacenters/:id e. Update datacenter
         * @apiName PutSingleDatacenters
         * @apiGroup Datacenters
         * @apiDescription Use patch to partial update.
         *
         * @apiParam (Param) {String} id Datacenter unique id.
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
         * @api {put} /datacenters/:id f. Full Update datacenter
         * @apiName PatchSingleDatacenters
         * @apiGroup Datacenters
         *
         * @apiParam (Param) {String} id Datacenter unique id.
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
         * @api {delete} /datacenters/:id g. Delete single datacenter
         * @apiName DeleteSingleDatacenters
         * @apiGroup Datacenters
         *
         * @apiParam (Param) {String} id Datacenter unique id.
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
         * @api {post} /datacenters/:id/roles/ h. Add access Role
         * @apiName PostRoleDatacenters
         * @apiGroup Datacenters
         *
         * @apiParam (Param) {String} id Datacenter unique id.
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
         * @api {put} /datacenters/:id/roles i. Update access role
         * @apiName PutRoleDatacenters
         * @apiGroup Datacenters
         * @apiDescription Update all access roles, remember if you don´t send your access, after success you lose the access it´s
         *
         * @apiParam (Param) {String} id Datacenter unique id.
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
         * @api {put} /datacenters/:id/roles/:idu j. Update specific access role
         * @apiName PutSingleRoleDatacenters
         * @apiGroup Datacenters
         * @apiDescription Update access level one role to one application
         *
         * @apiParam (Param) {String} id Datacenter unique id.
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
         * @api {delete} /datacenters/:id/roles/:idu l. Delete one role
         * @apiName DeleteRoleDatacenters
         * @apiGroup Datacenters
         * @apiDescription Delete unique role.
         *
         * @apiParam (Param) {String} id Datacenter unique id.
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

        /*
        Actions
        */
        /**
         * @api {get} /datacenters/:id/servers/ b. Get server list by Dc
         * @apiName GetServersDatacenters
         * @apiGroup Datacenters
         * @apiDescription List all servers filtered by id dc
         *
         * @apiParam (Param) {String} id Datacenter unique id.
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
         *        found: 1,
         *        limit: 20,
         *        total_pages: 1,
         *        current_page: 1,
         *        items: (Array)
         *     }
         */
        .get('/:id/servers/', authenticate(), SyncerApp.find)
        /**
         * @api {get} /datacenters/:id/servers/count b. Count servers by Dc
         * @apiName GetServersCountDatacenters
         * @apiGroup Datacenters
         *
         * @apiParam (Param) {String} id Datacenter unique id.
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
        .get('/:id/servers/count', authenticate(), SyncerApp.count)
        /**
         * @api {patch} /datacenters/:id/sync_count_servers/ b. Sync servers
         * @apiName PatchSyncCountServers
         * @apiGroup Datacenters
         * @apiDescription Syncronize all servers filters by id dc. (Count)
         *
         * @apiParam (Param) {String} id Datacenter unique id.
         *
         * @apiPermission JWT (Read | Write | Admin)
         * @apiHeader (Header) {String} Authorization JWT {Token}
         *
         * @apiError (Error) PermissionError Token don`t have permission
         * @apiError (Error) Unauthorized Invalid Token
         * @apiError (Error) NotFound Entity not exist
         *
         * @apiSuccessExample {json} Success-Response:
         *     HTTP/1.1 204 OK
         *     {}
         *
         */
        .patch('/:id/sync_count_servers/', authenticate(), SyncerApp.syncer);
};
