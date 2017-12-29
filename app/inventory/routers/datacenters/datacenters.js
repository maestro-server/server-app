'use strict';

const authenticate = require('identity/middlewares/authenticate');
const Datacenter = require('../../entities/Datacenter');
const Servers = require('../../entities/Servers');

const PersistenceApp = require('core/applications/persistenceApplication')(Datacenter);
const SyncerApp = require('core/applications/relationsApplication')(Datacenter)(Servers)()();

const AccessApp = require('core/applications/accessApplication')(Datacenter);

module.exports = function (router) {

    router
    /**
     * @api {get} /datacenters 1 - List your datacenters
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
     * @apiParam (Param) {String} [limi=20] Limit result.
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
         * @api {get} /datacenters/count 2 - Count total dcs
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
         * @api {get} /datacenters/:id 3 - Get single dc
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

        .delete('/:id/roles/:idu', authenticate(), AccessApp.remove)

        /*
        Actions
        */
        .get('/:id/servers/', authenticate(), SyncerApp.find)

        .get('/:id/servers/count', authenticate(), SyncerApp.count)

        .patch('/:id/sync_count_servers/', authenticate(), SyncerApp.syncer);
};
