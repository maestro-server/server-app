'use strict';

const authenticate = require('identity/middlewares/authenticate');

const Images = require('../../entities/Images');
const Team = require('identity/entities/Teams');

const PersistenceAppServers = require('../../applications/persistenceServers');
const WrapperPersistenceApp = require('core/applications/wrapperPersistenceApplication')(Images)(Team);
const WrapperPersistenceAppDefault = WrapperPersistenceApp()();

const AccessApp = require('core/applications/accessApplication');
const WrapperAccessApp = WrapperPersistenceApp(AccessApp)();

module.exports = function (router) {

    router
    /**
     * @api {get} /teams/:id/images ia. List Images for Team
     * @apiName GetListImages
     * @apiGroup Teams
     * @apiDescription Use for teams scope, have be all actions, params and option in /images,
     *
     * @apiParam (Param) {String} id Team unique ID.
     * @apiParam (Param) {String} idu Image unique ID.
     */
        .get('/teams/:id/images', authenticate(), WrapperPersistenceApp(PersistenceAppServers)().find)
        /**
         * @api {get} /teams/:id/images/count ib. Count Images for Team
         * @apiName GetCountListImagesTeam
         * @apiGroup Teams
         */
        .get('/teams/:id/images/count', authenticate(), WrapperPersistenceAppDefault.count)
        /**
         * @api {get} /teams/:id/images/:idu ic. Single Images for Team
         * @apiName GetSingleListImagesTeam
         * @apiGroup Teams
         */
        .get('/teams/:id/images/:idu', authenticate(), WrapperPersistenceAppDefault.findOne)
        /**
         * @api {put} /teams/:id/images/:idu id. Update all Images for Team
         * @apiName UpdateSingleListImagesTeam
         * @apiGroup Teams
         */
        .put('/teams/:id/images/:idu', authenticate(), WrapperPersistenceAppDefault.update)
        /**
         * @api {patch} /teams/:id/images/:idu ie. Partial Images for Team
         * @apiName GetPartialSingleListImagesTeam
         * @apiGroup Teams
         */
        .patch('/teams/:id/images/:idu', authenticate(), WrapperPersistenceAppDefault.patch)
        /**
         * @api {delete} /teams/:id/images/:idu if. Single Images for Team
         * @apiName DeleteSingleListImagesTeam
         * @apiGroup Teams
         */
        .delete('/teams/:id/images/:idu', authenticate(), WrapperPersistenceAppDefault.remove)
        /**
         * @api {post} /teams/:id/images/ ig. Create Images for Team
         * @apiName PostSingleListImagesTeam
         * @apiGroup Teams
         */
        .post('/teams/:id/images', authenticate(), WrapperPersistenceAppDefault.create)

        /**
         * Roles
         */
        /**
         * @api {post} /teams/:id/images/:idu/roles ih. Create access role
         * @apiName GetSingleListImagesTeam
         * @apiGroup Teams
         */
        .post('/teams/:id/images/:idu/roles', authenticate(), WrapperAccessApp.create)
        /**
         * @api {put} /teams/:id/images/:idu/roles ii. Update all access role
         * @apiName GetSingleListImagesTeam
         * @apiGroup Teams
         */
        .put('/teams/:id/images/:idu/roles', authenticate(), WrapperAccessApp.update)
        /**
         * @api {put} /teams/:id/images/:idu/roles/:ida ij. Update access role
         * @apiName GetSingleListImagesTeam
         * @apiGroup Teams
         */
        .put('/teams/:id/images/:idu/roles/:ida', authenticate(), WrapperAccessApp.updateSingle)
        /**
         * @api {delete} /teams/:id/images/:idu/roles/:ida il. Delete access role
         * @apiName GetSingleListImagesTeam
         * @apiGroup Teams
         */
        .delete('/teams/:id/images/:idu/roles/:ida', authenticate(), WrapperAccessApp.remove);

};
