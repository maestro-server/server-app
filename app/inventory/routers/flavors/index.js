'use strict';

const authenticate = require('identity/middlewares/authenticate');

const Flavors = require('../../entities/Flavors');
const Team = require('identity/entities/Teams');

const WrapperPersistenceApp = require('core/applications/wrapperPersistenceApplication')(Flavors)(Team);
const WrapperPersistenceAppDefault = WrapperPersistenceApp()();

module.exports = function (router) {

    router
    /**
     * @api {get} /teams/:id/flavors fla. List Flavors for Team
     * @apiName GetListFlavor
     * @apiGroup Teams
     * @apiDescription Use for teams scope, have be all actions, params and option in /flavors,
     *
     * @apiParam (Param) {String} id Team unique ID.
     * @apiParam (Param) {String} idu Flavor unique ID.
     */
        .get('/teams/:id/flavors', authenticate(), WrapperPersistenceApp()().find)
        /**
         * @api {get} /teams/:id/flavors/count flb. Count Flavors for Team
         * @apiName GetCountListFlavorsTeam
         * @apiGroup Teams
         */
        .get('/teams/:id/flavors/count', authenticate(), WrapperPersistenceAppDefault.count)
        /**
         * @api {get} /teams/:id/flavors/:idu flc. Single Flavors for Team
         * @apiName GetSingleListFlavorsTeam
         * @apiGroup Teams
         */
        .get('/teams/:id/flavors/:idu', authenticate(), WrapperPersistenceAppDefault.findOne)
        /**
         * @api {put} /teams/:id/flavors/:idu fld. Update all Flavors for Team
         * @apiName UpdateSingleListTeam
         * @apiGroup Teams
         */
        .put('/teams/:id/flavors/:idu', authenticate(), WrapperPersistenceAppDefault.update)
        /**
         * @api {patch} /teams/:id/flavors/:idu fle. Partial Flavors for Team
         * @apiName GetPartialSingleListFlavorsTeam
         * @apiGroup Teams
         */
        .patch('/teams/:id/flavors/:idu', authenticate(), WrapperPersistenceAppDefault.patch)
        /**
         * @api {delete} /teams/:id/flavors/:idu flf. Single Flavors for Team
         * @apiName DeleteSingleListFlavorsTeam
         * @apiGroup Teams
         */
        .delete('/teams/:id/flavors/:idu', authenticate(), WrapperPersistenceAppDefault.remove)
        /**
         * @api {post} /teams/:id/flavors/ flg. Create Flavors for Team
         * @apiName PostSingleListFlavorsTeam
         * @apiGroup Teams
         */
        .post('/teams/:id/flavors', authenticate(), WrapperPersistenceAppDefault.create);
};
