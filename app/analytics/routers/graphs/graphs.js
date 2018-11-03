'use strict';

const authenticate = require('identity/middlewares/authenticate');

const Graph = require('../../entities/Graph');
const PersistenceApp = require('core/applications/persistenceApplication')(Graph);
const PersistenceGraph = require('../../applications/persistenceGraph')(Graph);

const AccessApp = require('core/applications/accessApplication')(Graph);


module.exports = function (router) {

    router
    /** @api {get} /graphs a. List your graphs
     * @apiName GetGraph
     * @apiGroup Graphs
     *
     * @apiParam (Param) {Json} [query] Create a query to filters, the fields received some transformation.
     * <br/>
     * <pre class="prettyprint language-json" data-type="json">
     * <code>{
         * <br/>   "name": 'search by name',
         * <br/>   "lsystem": 'search by system name'
         * <br/>}
     *  </code>
     * </pre>
     * <br/><b>The list modification is:</b>
     * <br/><i>{alias} = {query into mongodb}</i>
     * <ul>
     *     <li>lsystem = systems.name</li>
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
        .get('/', authenticate(), PersistenceGraph.find)
        /**
         * @api {get} /graphs/count b. Count total graphs
         * @apiName GetCountGraph
         * @apiGroup Graphs
         *
         * @apiParam (Param) {String} [name] Filter by name (Exacly).
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
         * @api {get} /graphs/:id c. Get single graph
         * @apiName GetSingleGraph
         * @apiGroup Graphs
         *
         * @apiParam (Param) {String} id Graph unique id.
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
         * @api {post} /graphs/ d. Create single graph
         * @apiName PostGraphs
         * @apiGroup Graphs
         *
         *
         * @apiParam (Body x-www) {String} name Name [min 3, max 30]
         * @apiParam (Body x-www) {String} status Status, Can be [process, warning, error, finished]
         * @apiParam (Body x-www) {String} type Type Graph type [bussiness]
         * @apiParam (Body x-www) {Number} [tab] Tab used only for layout. Show the actived tab [0, 1 or 2]
         * @apiParam (Body x-www) {Array} [apps] Apps, create graph regarding selected applications
         * <br/>
         * <pre class="prettyprint language-json" data-type="json">
         * <code>[{
         * <br/>   "_id": (String),
         * <br/>   "name": (String)
         * <br/>}]
         *  </code>
         * </pre>
         * @apiParam (Body x-www) {Array} [systems] Systems, create graph regarding selected systems
         * <br/>
         * <pre class="prettyprint language-json" data-type="json">
         * <code>[{
         * <br/>   "_id": (String),
         * <br/>   "name": (String)
         * <br/>}]
         *  </code>
         * </pre>
         * @apiParam (Body x-www) {Array} [clients] Clients, create graph regarding all client systems
         * <br/>
         * <pre class="prettyprint language-json" data-type="json">
         * <code>[{
         * <br/>   "_id": (String),
         * <br/>   "name": (String)
         * <br/>}]
         *  </code>
         * </pre>
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
        .post('/', authenticate(), PersistenceGraph.create)
        /**
         * @api {put} /graphs/:id f. Full Update graph
         * @apiName PatchSingleGraphs
         * @apiGroup Graphs
         *
         * @apiParam (Param) {String} id Graph unique id.
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

        .put('/:id', authenticate(), PersistenceGraph.update)
        /**
         * @api {patch} /graphs/:id e. Update graph
         * @apiName PutSingleGraphs
         * @apiGroup Graphs
         * @apiDescription Use patch to partial update.
         *
         * @apiParam (Param) {String} id Graph unique id.
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
         * @api {delete} /graphs/:id g. Delete single graph
         * @apiName DeleteSingleGraphs
         * @apiGroup Graphs
         *
         * @apiParam (Param) {String} id Graph unique id.
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
         * @api {post} /graphs/:id/public g. Allow the graph to be viwed
         * @apiName PostPublicGraphs
         * @apiGroup Graphs
         * @apiDescription Graphs can be viwed by public, use specific link with jwy token to embed this graph without authetication.
         *
         * @apiParam (Param) {String} id Graph unique id.
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
         *     {
         *     "id":" <graph id>",
         *     "token":" <JWT token - used to autheticate on link>",
         *     "timestamp": <Timestamp>
         *     }
         */
        .post('/:id/public', authenticate(), PersistenceGraph.createPublicToken)



        /**
         * Roles
         */
        /**
         * @api {post} /graphs/:id/roles/ h. Add access Role
         * @apiName PostRoleGraphs
         * @apiGroup Graphs
         *
         * @apiParam (Param) {String} id Graph unique id.
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
         * @api {put} /graphs/:id/roles i. Update access role
         * @apiName PutRoleGraphs
         * @apiGroup Graphs
         * @apiDescription Update all access roles, remember if you don´t send your access, after success you lose the access it´s
         *
         * @apiParam (Param) {String} id Graph unique id.
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
         * @api {put} /graphs/:id/roles/:idu j. Update specific access role
         * @apiName PutSingleRoleGraphs
         * @apiGroup Graphs
         * @apiDescription Update access level one role to one graph
         *
         * @apiParam (Param) {String} id Graph unique id.
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
         * @api {delete} /graphs/:id/roles/:idu l. Delete one role
         * @apiName DeleteRoleGraphs
         * @apiGroup Graphs
         * @apiDescription Delete unique role.
         *
         * @apiParam (Param) {String} id Graph unique id.
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
