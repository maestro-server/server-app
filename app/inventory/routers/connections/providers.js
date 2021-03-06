'use strict';

const authenticate = require('identity/middlewares/authenticate');
const Connections = require('../../entities/Connections');

const PersistenceConnection = require('../../applications/persistenceConnection')(Connections);

module.exports = function (router) {

    router
    /**
     * @api {get} /providers a. Template list of connections
     * @apiName GetAvailConnection
     * @apiGroup Connections
     *
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
         *        resources: []
         *     }
     */

    .get('/', authenticate(), PersistenceConnection.info)

    /**
     * @api {get} /providers/rules c. Rules for providers
     * @apiName GetRulesConnection
     * @apiGroup Connections
     *
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
     *        values: []
     *     }
     */

    .get('/rules', authenticate(), PersistenceConnection.rules)

    /**
     * @api {get} /providers/rules/:provider c. Single provider rule
     * @apiName GetSingleRulesConnection
     * @apiGroup Connections
     *
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
     *        values: {
     *          "permission": []
     *        }
     *     }
     */

    .get('/rules/:provider', authenticate(), PersistenceConnection.single_rules)

    /**
     * @api {get} /providers/:provider b. Connection details regarding the provider
     * @apiName GetSingleAvailConnection
     * @apiGroup Connections
     *
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
     *        name: <string>,
     *        data: []
     *     }
     */

    .get('/:provider', authenticate(), PersistenceConnection.single);
};
