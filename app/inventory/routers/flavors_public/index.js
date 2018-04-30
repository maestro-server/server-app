'use strict';

const authenticate = require('identity/middlewares/authenticate');

const FlavorsPublic = require('../../entities/FlavorsPublic');
const Team = require('identity/entities/Teams');

const WrapperPersistenceApp = require('core/applications/wrapperPersistenceApplication')(FlavorsPublic)(Team);
const WrapperPersistenceAppDefault = WrapperPersistenceApp()();

module.exports = function (router) {

    router
    /**
     * @api {get} /teams/:id/flavors_public fla. List Flavors for Team
     * @apiName GetListFlavorPublic
     * @apiGroup Teams
     * @apiDescription Use for teams scope, have be all actions, params and option in /flavors_public,
     *
     * @apiParam (Param) {String} id Team unique ID.
     * @apiParam (Param) {String} idu Flavor unique ID.
     */
    .get('/teams/:id/flavors_public', authenticate(), WrapperPersistenceApp()().find)
    /**
     * @api {get} /teams/:id/flavors_public/count flb. Count Flavors for Team
     * @apiName GetCountListFlavorsPublicTeam
     * @apiGroup Teams
     */
    .get('/teams/:id/flavors_public/count', authenticate(), WrapperPersistenceAppDefault.count)
    /**
     * @api {get} /teams/:id/flavors_public/:idu flc. Single Flavors for Team
     * @apiName GetSingleListFlavorsPublicTeam
     * @apiGroup Teams
     */
    .get('/teams/:id/flavors_public/:idu', authenticate(), WrapperPersistenceAppDefault.findOne);
};
