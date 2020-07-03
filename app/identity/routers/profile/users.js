'use strict';

const authenticate = require('identity/middlewares/authenticate');
const authenticate_private = require('identity/middlewares/authenticate_private');

const User = require('identity/entities/Users');
const UserAuth = require('identity/entities/Auth');

/**
 *
 * Entity to call persisntece layer
 */
const ProfilePersistenceService = require('identity/services/PersistenceServices');
const PersistenceApp = require('core/applications/persistenceApplication')(User, ProfilePersistenceService);
const AuthApp = require('identity/applications/authApplication')(UserAuth);

const UploaderApp = require('core/applications/uploadApplication')(User);

module.exports = function (router) {

    router
        /**
         * @api {get} /users a. Get list of users
         * @apiName GetUsers
         * @apiGroup Users
         *
         * @apiParam {String} username Search by username
         * @apiParam {String} email Search by Email
         *
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
         * @api {post} /users b. Create User
         * @apiName PostUsers
         * @apiGroup Users
         *
         * @apiParam (Body x-www) {String} name Username, used in profile label [min 3 max 30]
         * @apiParam (Body x-www) {String} email Email, used in auth [email]
         * @apiParam (Body x-www) {String} password Password, will be encrypted
         * @apiParam (Body x-www) {String} [fullname] Fullname
         * @apiParam (Body x-www) {String} [phone] Phone number
         * @apiParam (Body x-www) {String} [company] Company
         * @apiParam (Body x-www) {String} [avatar] Avatar
         * @apiParam (Body x-www) {String} [job] Job
         * @apiParam (Body x-www) {Object} [country] Country and state
         * @apiParam (Body x-www) {String} [city] City
         * @apiParam (Body x-www) {String} [address] Address
         *
         * @apiError (Error) ValidationError Incorrect fields
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
        .post('/', PersistenceApp.create)

        /**
         * @api {get} /users/autocomplete c. Get list user with autocomplete
         * @apiName GetAutocompleteUsers
         * @apiGroup Users
         *
         * @apiParam {String} complete Filter by name with regex like "%term%"".
         *
         * @apiPermission JWT
         * @apiHeader (Auth) {String} Authorization JWT {Token}
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
         * @api {get} /users/upload e. Signed upload workflow
         * @apiName GetUploadUsers
         * @apiGroup Users
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
         * @api {get} /users/upload f. Read a private file
         * @apiName ReadUploadUsers
         * @apiGroup Users
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
        .get('/upload/file/', authenticate_private(), UploaderApp.readFile)

        /**
         * @api {put} /users/upload g. Upload file in local server (used only local upload is enabled)
         * @apiName PutUploadUsers
         * @apiGroup Users
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

        .get('/forgot', (req, res) => {
          res.json({});
         })
        /**
         * @api {get} /users/:id h. Get single profile
         * @apiName GetSingleUsers
         * @apiGroup Users
         *
         * @apiParam (Param) {String} id User unique id.
         *
         * @apiPermission JWT (Read | Write | Admin)
         * @apiHeader (Auth) {String} Authorization JWT {Token}
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
         * @api {post} /users/auth i. Authenticate
         * @apiName PostAuth
         * @apiGroup Auth
         *
         * @apiParam (Body x-www) {String} email Your email [email]
         * @apiParam (Body x-www) {String} password Password [min 3, max 150]
         *
         * @apiPermission JWT (Admin)
         * @apiHeader (Auth) {String} Authorization JWT {Token}
         *
         *
         * @apiSuccessExample {json} Success-Response:
         *     HTTP/1.1 202 OK
         *     {
         *          token: (String),
         *          users: {}
         *     }
         */
        .post('/auth', AuthApp.login)

        /**
         * @api {patch} /users/pass j. Update exist password
         * @apiName PatchAuth
         * @apiGroup Auth
         *
         * @apiPermission JWT (Admin)
         * @apiHeader (Auth) {String} Authorization JWT {Token}
         *
         * @apiParam (Body x-www) {String} email Your email [email]
         * @apiParam (Body x-www) {String} password Actually Password [min 3, max 150]
         * @apiParam (Body x-www) {String} newpass New Password [min 3, max 150]
         *
         * @apiSuccessExample {json} Success-Response:
         *     HTTP/1.1 202 OK
         *     {}
         */
        .patch('/auth/pass', authenticate(), AuthApp.updateExistPassword)

        /**
         * @api {post} /users/forgot l. Send a forgot email
         * @apiName PostForgotAuth
         * @apiGroup Auth
         * @apiDescription Send a email with url callback for recorver
         *
         * @apiPermission JWT (Admin)
         * @apiHeader (Auth) {String} Authorization JWT {Token}
         *
         * @apiParam (Body x-www) {String} email Your email [email]
         * @apiParam (Body x-www) {String} callback_url Url for callback
         *
         *
         * @apiSuccessExample {json} Success-Response:
         *     HTTP/1.1 202 OK
         *     {}
         */
        .post('/forgot', AuthApp.forgot)
        /**
         * @api {put} /users/forgot/change m. Change password
         * @apiName PutForgotChangeAuth
         * @apiGroup Auth
         *
         * @apiPermission JWT (Admin)
         * @apiHeader (Auth) {String} Authorization JWT {Token}
         *
         * @apiParam (Body x-www) {String} password New Password [min 3 max 30]
         * @apiParam (Body x-www) {String} token Token received in forgot entity
         *
         * @apiSuccessExample {json} Success-Response:
         *     HTTP/1.1 202 OK
         *     {}
         */
        .put('/forgot/change', AuthApp.updateForgotPassword);
};
