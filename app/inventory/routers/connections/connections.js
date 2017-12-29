'use strict';

const authenticate = require('identity/middlewares/authenticate');
const Connections = require('../../entities/Connections');

const PersistenceConnection = require('../../applications/persistenceConnection')(Connections);
const Persistenceconnection = require('core/applications/persistenceApplication')(Connections);
const Accessconnection = require('core/applications/accessApplication')(Connections);

module.exports = function (router) {

    router
    /**
     * @api {get} /connections 1 - List your connections
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
     * @apiParam (Param) {String} [limi=20] Limit result.
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
        .get('/', authenticate(), Persistenceconnection.find)
        /**
         * @api {get} /connections/count 2 - Count total connections
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
        .get('/count', authenticate(), Persistenceconnection.count)
        /**
         * @api {get} /connections/:id 3 - Get single connection
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
        .get('/:id', authenticate(), Persistenceconnection.findOne)

        .put('/:id', authenticate(), Persistenceconnection.update)

        .patch('/:id', authenticate(), Persistenceconnection.patch)

        .delete('/:id', authenticate(), PersistenceConnection.remove)

        .post('/', authenticate(), PersistenceConnection.create)

        .put('/:id/task/:command', authenticate(), PersistenceConnection.task)


        /**
         * Roles
         */
        .post('/:id/roles', authenticate(), Accessconnection.create)

        .put('/:id/roles/', authenticate(), Accessconnection.update)

        .put('/:id/roles/:idu', authenticate(), Accessconnection.updateSingle)

        .delete('/:id/roles/:idu', authenticate(), Accessconnection.remove);
};
