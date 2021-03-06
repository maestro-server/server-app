'use strict';

const authenticate = require('identity/middlewares/authenticate');
const FlavorsPublic = require('../../entities/FlavorsPublic');
const PersistenceApp = require('core/applications/persistenceApplication')(FlavorsPublic);

module.exports = function (router) {

    router
    /**
     * @api {get} /flavors_public a. List public flavors
     * @apiName GetFlavorPublic
     * @apiGroup Flavors
     *
     * @apiParam (Param) {Json} [query] Create a query to filters, the fields received some transformation.
     * <br/>
     * <pre class="prettyprint language-json" data-type="json">
     * <code>{
     * <br/>   "name": 'search by name'
     * <br/>}
     *  </code>
     * </pre>
     * <br/><b>Flavors don´t have modifications, only default regex filter:</b>
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
    .get('/', authenticate(), PersistenceApp.find)
    /**
     * @api {get} /flavors_public/count b. Count total flavors
     * @apiName GetCountFlavorPublic
     * @apiGroup Flavors
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
     * @api {get} /flavors_public/:id c. Get single flavor
     * @apiName GetSingleFlavorPublic
     * @apiGroup Flavors
     *
     * @apiParam (Param) {String} id Flavor unique id.
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
    .get('/:id', authenticate(), PersistenceApp.findOne);


};
