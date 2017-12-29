'use strict';

const authenticate = require('identity/middlewares/authenticate');

const Client = require('../../entities/Clients');
const System = require('../../entities/System');

const PersistenceApp = require('core/applications/persistenceApplication')(Client);
const PersistenceRelation = require('../../applications/persistenceSystem')(System)(Client);

const AccessApp = require('core/applications/accessApplication')(Client);

module.exports = function (router) {

    router
    /**
     * @api {get} /clients 1 - List your clients
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
     * <br/><i>{alias} = {query into mongodb}</i>
     * <ul>
     *     <li>lclient = clients.name</li>
     *     <li>contacts = upperCase(contacts)</li>
     *     <li>field is string the querie execute a regex research like "%filter%", EX: {'name': 'serv'}, It will return clients with name 'services58' or '754services'.</li>
     * </ul>
     * @apiParam (Param) {String} [limi=20] Limit result.
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
     * @api {get} /clients/count 2 - Count total clients
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
     * @api {get} /clients/:id 3 - Get single client
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

    /**
     * System
     */
    .patch('/:id/system', authenticate(), PersistenceRelation.create)

    .delete('/:id/system', authenticate(), PersistenceRelation.remove);
};
