'use strict';

const authenticate = require('identity/middlewares/authenticate');
const User = require('../../entities/Users');
const ProfilePersistenceService = require('identity/services/PersistenceServices');
const PersistenceApp = require('core/applications/persistenceApplication')(User, ProfilePersistenceService);

module.exports = function (router) {

    router
        /**
         * @api {get} /me a. Get my profile
         * @apiName GetMe
         * @apiGroup Me
         * @apiDescription Get all information about the logged user.
         *
         * @apiPermission JWT (Read | Write | Admin)
         * @apiHeader (Header) {String} Authorization JWT {Token}
         *
         * @apiError (Error) Unauthorized Invalid Token
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
        .get('/', authenticate(), function (req, res, next) {
            req.params.id = req.user._id;

            PersistenceApp.findOne(req, res, next);
        })
        /**
         * @api {patch} /me b. Update profile
         * @apiName PatchMe
         * @apiGroup Me
         *
         * @apiPermission JWT (Read | Write | Admin)
         * @apiHeader (Header) {String} Authorization JWT {Token}
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
         * @apiError (Error) Unauthorized Invalid Token
         * @apiError (Error) ValidationError Incorrect fields
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
        .patch('/', authenticate(), function (req, res, next) {
            req.params.id = req.user._id;

            PersistenceApp.patch(req, res, next);
        })
        /**
         * @api {delete} /me c. Delete this profile
         * @apiName DeleteMe
         * @apiGroup Me
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
        .delete('/', authenticate(), function (req, res, next) {
            req.params.id = req.user._id;

            PersistenceApp.remove(req, res, next);
        });



};
