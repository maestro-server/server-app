'use strict';

const authenticate = require('identity/middlewares/authenticate');
const Servers = require('../../entities/Servers');

const PersistenceApp = require('core/applications/persistenceApplication')(Servers);
const PersistenceAppServers = require('../../applications/persistenceServers')(Servers);

const AccessApp = require('core/applications/accessApplication')(Servers);

module.exports = function (router) {

    router
    /**
     * @api {get} /servers 1- List your servers
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
     * <br/><i>{alias} = {query into mongodb}</i>
     * <ul>
     *     <li>id = _id</li>
     *     <li>datacenters = datacenters.name</li>
     *     <li>os = os.base</li>
     *     <li>auth = auth.type</li>
     *     <li>user = auth.username</li>
     *     <li>field is string the querie execute a regex research like "%filter%", EX: {'name': 'serv'}, It will return servers with name 'services58' or '754services'.</li>
     * </ul>
     * @apiParam (Param) {String} [limi=20] Limit result.
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
        .get('/', authenticate(), PersistenceAppServers.findServers)
        /**
         * @api {get} /servers/count 2 - Count total servers
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
         * @api {get} /servers/:id 3 - Get single server
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

        .put('/:id', authenticate(), PersistenceApp.update)

        .patch('/:id', authenticate(), PersistenceApp.patch)

        .delete('/:id', authenticate(), PersistenceApp.remove)

        .post('/', authenticate(), PersistenceApp.create)

        /**
         * Roles
         */
        .post('/:id/roles', authenticate(), AccessApp.create)

        .put('/:id/roles/', authenticate(), AccessApp.update)

        .put('/:id/roles/:idu', authenticate(), AccessApp.updateSingle)

        .delete('/:id/roles/:idu', authenticate(), AccessApp.remove);
};
