'use strict';

const authenticate = require('identity/middlewares/authenticate');

const User = require('identity/entities/Users');
const UserAuth = require('identity/entities/Auth');
const formidable = require('formidable');

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
         * @api {get} /users/upload d. Upload avatar users
         * @apiName GetUploadUsers
         * @apiGroup Users
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

        .put('/upload', authenticate(), UploaderApp.receiverFile)

        .get('/forgot', (req, res) => {
          res.json({});
         })
        /**
         * @api {get} /users/:id e. Get single profile
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
         * @api {post} /users/auth a. Authenticate
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
         * @api {patch} /users/pass b. Update exist password
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
         * @api {post} /users/forgot c. Send a forgot email
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
         * @api {put} /users/forgot/change d. Change password
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
