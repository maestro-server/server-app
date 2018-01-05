'use strict';

const authenticate = require('identity/middlewares/authenticate');
const Images = require('../../entities/Images');
const PersistenceApp = require('core/applications/persistenceApplication')(Images);
const AccessApp = require('core/applications/accessApplication')(Images);

module.exports = function (router) {

    router
    /**
     * @api {get} /images a. List your images
     * @apiName GetImages
     * @apiGroup Images
     *
     * @apiParam (Param) {Json} [query] Create a query to filters, the fields received some transformation.
     * <br/>
     * <pre class="prettyprint language-json" data-type="json">
     * <code>{
         * <br/>   "name": 'search by name'
         * <br/>}
     *  </code>
     * </pre>
     * <br/><b>Images don´t have modifications, only default regex filter:</b>
     * <br/><i>{alias} = {query into mongodb}</i>
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
         * @api {get} /images/count b. Count total apps
         * @apiName GetCountImages
         * @apiGroup Images
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
         * @api {get} /images/:id c. Get single image
         * @apiName GetSingleImages
         * @apiGroup Images
         *
         * @apiParam (Param) {String} id Images unique id.
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
         * @api {post} /images/ d. Create single image
         * @apiName PostImages
         * @apiGroup Images
         *
         *
         * @apiParam (Body x-www) {String} name Name [min 3, max 150]
         * @apiParam (Body x-www) {String} [image_id] Id Image [max 800]
         * @apiParam (Body x-www) {String} [image_type] Type image (each provider have yours types)
         * @apiParam (Body x-www) {String} [image_location] Path to volume location (each provider have yours rules)
         * @apiParam (Body x-www) {Array} [tags List of tags, [Array of Objects]
         * <br/>
         * <pre class="prettyprint language-json" data-type="json">
         * <code>[{
         * <br/>   "key": (String),
         * <br/>   "value": (String)
         * <br/>}]
         *  </code>
         * </pre>
         * @apiParam (Body x-www) {String} unique_id Unique name, normally use in Databases
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
         * @api {patch} /images/:id e. Update image
         * @apiName PutSingleImages
         * @apiGroup Images
         * @apiDescription Use patch to partial update.
         *
         * @apiParam (Param) {String} id Image unique id.
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
         * @api {put} /images/:id f. Full Update image
         * @apiName PatchSingleImages
         * @apiGroup Images
         *
         * @apiParam (Param) {String} id Image unique id.
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
         * @api {delete} /images/:id g. Delete single image
         * @apiName DeleteSingleImages
         * @apiGroup Images
         *
         * @apiParam (Param) {String} id Image unique id.
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
         * @api {post} /images/:id/roles/ h. Add access Role
         * @apiName PostRoleImages
         * @apiGroup Images
         *
         * @apiParam (Param) {String} id Image unique id.
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
         * @api {put} /images/:id/roles i. Update access role
         * @apiName PutRoleImages
         * @apiGroup Images
         * @apiDescription Update all access roles, remember if you don´t send your access, after success you lose the access it´s
         *
         * @apiParam (Param) {String} id Image unique id.
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
         * @api {put} /images/:id/roles/:idu j. Update specific access role
         * @apiName PutSingleRoleImages
         * @apiGroup Images
         * @apiDescription Update access level one role to one application
         *
         * @apiParam (Param) {String} id Image unique id.
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
         * @api {delete} /images/:id/roles/:idu l. Delete one role
         * @apiName DeleteRoleImages
         * @apiGroup Images
         * @apiDescription Delete unique role.
         *
         * @apiParam (Param) {String} id Image unique id.
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
