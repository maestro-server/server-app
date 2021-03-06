'use strict';

const authenticate = require('identity/middlewares/authenticate');


const Team = require('../../entities/Teams');
const PersistenceAudit = require('core/applications/persistenceAudit')(Team);
const PersistenceApp = require('core/applications/persistenceApplication')(Team);
const AccessApp = require('core/applications/accessApplication')(Team);

const UploaderApp = require('core/applications/uploadApplication')(Team);

module.exports = function (router) {

    router
        /**
         * @api {get} /teams a. Get list of yours teams
         * @apiName GetTeams
         * @apiGroup Teams
         *
         * @apiParam (Query) {String} [email] Filter by email.
         * @apiParam (Query) {String} [name] Filter by name.
         * @apiParam (Query) {String} [url] Filter by url.
         *
         * @apiPermission JWT (Read | Write | Admin)
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
         * @api {get} /teams/count b. Get total teams
         * @apiName GetTeamsCount
         * @apiGroup Teams
         *
         * @apiParam (Query) {String} [email] Filter by email.
         * @apiParam (Query) {String} [name] Filter by name.
         * @apiParam (Query) {String} [url] Filter by url.
         *
         * @apiPermission JWT (Read | Write | Admin)
         * @apiHeader (Auth) {String} Authorization JWT {Token}
         *
         * @apiError (Error) PermissionError Token don`t have permission
         * @apiError (Error) Unauthorized Invalid Token
         * @apiError (Error) NotFound List is empty
         *
         * @apiSuccessExample {json} Success-Response:
         *     HTTP/1.1 200 OK
         *     {
         *        count: (Number)
         *     }
         */
        .get('/count', authenticate(), PersistenceApp.count)
        /**
         * @api {get} /teams/autocomplete c. Autocomplete team name
         * @apiName GetTeamsAutocomplete
         * @apiGroup Teams
         *
         * @apiParam (Query) {String} [complete] Filter by name with regex like "%term%"".
         *
         * @apiPermission JWT (Read | Write | Admin)
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
        .get('/autocomplete', authenticate(), PersistenceApp.autocomplete)
        /**
         * @api {get} /teams/upload d. Signed upload workflow
         * @apiName GetTeamsUpload
         * @apiGroup Teams
         * @apiDescription Its only to mark and create a token authetication, to upload new files.
         *
         * @apiParam (Body x-www) {Resource} filetype Resource filetype to upload.
         *
         * @apiPermission JWT (Read | Write | Admin)
         * @apiHeader (Auth) {String} Authorization JWT {Token}
         *
         * @apiError (Error) PermissionError Token don`t have permission
         * @apiError (Error) Unauthorized Invalid Token
         * @apiError (Error) NotFound List is empty
         *
         * @apiSuccessExample {json} Success-Response:
         *     HTTP/1.1 200 OK
         *     {}
         */
        .get('/upload', authenticate(), UploaderApp.uploader)

        /**
         * @api {get} /teams/upload e. Read a private file
         * @apiName ReadUploadTeams
         * @apiGroup Teams
         *
         * @apiParam (query) {String} filename Filename path
         *
         * @apiPermission JWT (Read | Write | Admin)
         * @apiHeader (Auth) {String} Authorization Private JWT {Token}
         *
         * @apiError (Error) PermissionError Token don`t have permission
         * @apiError (Error) Unauthorized Invalid Token
         * @apiError (Error) NotFound List is empty
         *
         * @apiSuccessExample {json} Success-Response:
         *     HTTP/1.1 200 OK
         *     {}
         */
        .get('/upload/file/', UploaderApp.readFile)

        /**
         * @api {put} /teams/upload f. Upload file in local server (used only local upload is enabled)
         * @apiName PutUploadTeams
         * @apiGroup Teams
         *
         * @apiParam (params) {String} ext Used to construct url
         * @apiParam (params) {String} folder Mark a group folder, that file will be upload (users, teams or company)
         *
         * @apiParam (Body x-www) {Resource} filetype Resource filetype to upload.
         *
         * @apiPermission JWT (Read | Write | Admin)
         * @apiHeader (Auth) {String} Authorization JWT {Token}
         *
         * @apiError (Error) PermissionError Token don`t have permission
         * @apiError (Error) Unauthorized Invalid Token
         * @apiError (Error) NotFound List is empty
         *
         * @apiSuccessExample {json} Success-Response:
         *     HTTP/1.1 200 OK
         *     {}
         */
        .put('/upload', authenticate(), UploaderApp.receiverFile)

        /**
         * @api {get} /teams/:id g. Get single team
         * @apiName GetSingleTeam
         * @apiGroup Teams
         *
         * @apiParam (Param) {String} id Teams unique ID.
         *
         * @apiPermission JWT (Read | Write | Admin)
         * @apiHeader (Auth) {String} Authorization JWT {Token}
         *
         * @apiError (Error) PermissionError Token don`t have permission
         * @apiError (Error) Unauthorized Invalid Token
         * @apiError (Error) NotFound List is empty
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
         * @api {post} /teams/ h. Create team
         * @apiName PostTeamMembers
         * @apiGroup Teams
         *
         * @apiParam (Param) {String} id Teams unique ID.
         *
         * @apiParam (Body x-www) {String} name Name [min 3, max 150]
         * @apiParam (Body x-www) {String} email Email [string email]
         * @apiParam (Body x-www) {String} avatar Path to imagem [Url, http, https]
         * @apiParam (Body x-www) {String} url Url [min 3, max 150]
         *
         * @apiPermission JWT (Write | Admin)
         * @apiHeader (Auth) {String} Authorization JWT {Token}
         *
         * @apiError (Error) PermissionError Token don`t have permission
         * @apiError (Error) Unauthorized Invalid Token
         * @apiError (Error) NotFound List is empty
         *
         * @apiSuccessExample {json} Success-Response:
         *     HTTP/1.1 201 OK
         *     {
         *       "firstname": "John",
         *       "lastname": "Doe"
         *     }
         */
        .post('/', authenticate(), PersistenceApp.create)
        /**
         * @api {patch} /teams/:id i. Update partial teams
         * @apiName PatchSingleTeam
         * @apiGroup Teams
         *
         * @apiParam (Param) {String} id Teams unique ID.
         *
         * @apiParam (Body x-www) {String} name Name [min 3, max 150]
         * @apiParam (Body x-www) {String} field Any field describe in Create Doc
         *
         * @apiPermission JWT (Write | Admin)
         * @apiHeader (Auth) {String} Authorization JWT {Token}
         *
         * @apiError (Error) PermissionError Token don`t have permission
         * @apiError (Error) Unauthorized Invalid Token
         * @apiError (Error) NotFound List is empty
         *
         * @apiSuccessExample {json} Success-Response:
         *     HTTP/1.1 202 OK
         *     {}
         */
        .patch('/:id', authenticate(), PersistenceApp.patch)
        /**
         * @api {put} /teams/:id j. Update single teams
         * @apiName PutSingleTeam
         * @apiGroup Teams
         *
         * @apiParam (Param) {String} id Teams unique ID.
         *
         * @apiParam (Body x-www) {String} name Name [min 3, max 150]
         * @apiParam (Body x-www) {String} field Any field describe in Create Doc
         *
         * @apiPermission JWT (Write | Admin)
         * @apiHeader (Auth) {String} Authorization JWT {Token}
         *
         * @apiError (Error) PermissionError Token don`t have permission
         * @apiError (Error) Unauthorized Invalid Token
         * @apiError (Error) NotFound List is empty
         *
         * @apiSuccessExample {json} Success-Response:
         *     HTTP/1.1 204 OK
         *     {}
         */
        .put('/:id', authenticate(), PersistenceApp.update)
        /**
         * @api {delete} /teams/:id l. Delete team
         * @apiName DeleteSingleTeam
         * @apiGroup Teams
         *
         * @apiParam (Param) {String} id Teams unique ID.
         *
         * @apiPermission JWT (Admin)
         * @apiHeader (Auth) {String} Authorization JWT {Token}
         *
         * @apiError (Error) PermissionError Token don`t have permission
         * @apiError (Error) Unauthorized Invalid Token
         * @apiError (Error) NotFound List is empty
         *
         * @apiSuccessExample {json} Success-Response:
         *     HTTP/1.1 204 OK
         */
        .delete('/:id', authenticate(), PersistenceApp.remove)

        /**
         * @api {get} /teams/:id/audit m. Get changed history
         * @apiName GetAuditTeams
         * @apiGroup Teams
         *
         * @apiParam (Param) {String} id Teams unique id.
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
         * @api {post} /teams/:id/members n. Add member on team
         * @apiName PostSingleTeamMembers
         * @apiGroup Teams
         *
         * @apiParam (Param) {String} id Teams unique ID.
         *
         * @apiParam (Body x-www) {String} name User/Team name
         * @apiParam (Body x-www) {String} [email] User/Team email
         * @apiParam (Body x-www) {Number} role Access Permission [1 = Read, 3 = Write, 7 = Admin]
         * @apiParam (Body x-www) {String} id User/Team Id
         * @apiParam (Body x-www) {String} refs Entity Type [users | teams | projects]
         *
         * @apiPermission JWT (Admin)
         * @apiHeader (Auth) {String} Authorization JWT {Token}
         *
         * @apiError (Error) PermissionError Token don`t have permission
         * @apiError (Error) Unauthorized Invalid Token
         * @apiError (Error) NotFound List is empty
         *
         * @apiSuccessExample {json} Success-Response:
         *     HTTP/1.1 201 OK
         *     {}
         */
        .post('/:id/members', authenticate(), AccessApp.create)
        /**
         * @api {put} /teams/:id/members o. Update all members
         * @apiName PutTeamMembers
         * @apiGroup Teams
         *
         * @apiParam (Param) {String} id Teams unique ID.
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
         *
         * @apiPermission JWT (Admin)
         * @apiHeader (Auth) {String} Authorization JWT {Token}
         *
         * @apiError (Error) PermissionError Token don`t have permission
         * @apiError (Error) Unauthorized Invalid Token
         * @apiError (Error) NotFound List is empty
         *
         * @apiSuccessExample {json} Success-Response:
         *     HTTP/1.1 200 OK
         *     {}
         */
        .put('/:id/members/', authenticate(), AccessApp.update)
        /**
         * @api {put} /teams/:id/members/:idu p. Update single member
         * @apiName PutTeamMembersSingle
         * @apiGroup Teams
         *
         * @apiParam (Param) {String} id Teams unique ID.
         * @apiParam (Param) {String} idu Member unique ID [Users, Teams].
         *
         * @apiParam (Body x-www) {String} name User/Team name
         * @apiParam (Body x-www) {String} [email] User/Team email
         * @apiParam (Body x-www) {Number} role Access Permission [1 = Read, 3 = Write, 7 = Admin]
         * @apiParam (Body x-www) {String} id User/Team Id
         * @apiParam (Body x-www) {String} refs Entity Type [users | teams | projects]
         *
         * @apiPermission JWT (Admin)
         * @apiHeader (Auth) {String} Authorization JWT {Token}
         *
         * @apiError (Error) PermissionError Token don`t have permission
         * @apiError (Error) Unauthorized Invalid Token
         * @apiError (Error) NotFound List is empty
         *
         * @apiSuccessExample {json} Success-Response:
         *     HTTP/1.1 200 OK
         *     {}
         */
        .put('/:id/members/:idu', authenticate(), AccessApp.updateSingle)

        /**
         * @api {delete} /teams/:id/members/:idu q. Delete single member team
         * @apiName DeleteTeamMembers
         * @apiGroup Teams
         *
         * @apiParam (Param) {String} id Teams unique ID.
         * @apiParam (Param) {String} idu Member unique ID [Users, Teams].
         *
         * @apiPermission JWT (Admin)
         * @apiHeader (Auth) {String} Authorization JWT {Token}
         *
         * @apiError (Error) PermissionError Token don`t have permission
         * @apiError (Error) Unauthorized Invalid Token
         * @apiError (Error) NotFound List is empty
         *
         * @apiSuccessExample {json} Success-Response:
         *     HTTP/1.1 204 OK
         */
        .delete('/:id/members/:idu', authenticate(), AccessApp.remove);
};
