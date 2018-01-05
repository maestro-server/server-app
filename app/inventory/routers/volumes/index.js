'use strict';

const authenticate = require('identity/middlewares/authenticate');

const Volumes = require('../../entities/Volumes');
const Team = require('identity/entities/Teams');

const WrapperPersistenceApp = require('core/applications/wrapperPersistenceApplication')(Volumes)(Team);
const WrapperPersistenceAppDefault = WrapperPersistenceApp()();

const AccessApp = require('core/applications/accessApplication');
const WrapperAccessApp = WrapperPersistenceApp(AccessApp)();

module.exports = function (router) {

    router
    /**
         * @api {get} /teams/:id/volumes va. List Volumes for Team
         * @apiName GetListVolumes
         * @apiGroup Teams
         * @apiDescription Use for teams scope, have be all actions, params and option in /volumes,
         *
         * @apiParam (Param) {String} id Team unique ID.
         * @apiParam (Param) {String} idu Volume unique ID.
         */
        .get('/teams/:id/volumes', authenticate(), WrapperPersistenceAppDefault.find)
        /**
         * @api {get} /teams/:id/volumes/count vb. Count Volumes for Team
         * @apiName GetCountListVolumesTeam
         * @apiGroup Teams
         */
        .get('/teams/:id/volumes/count', authenticate(), WrapperPersistenceAppDefault.count)
        /**
         * @api {get} /teams/:id/volumes/:idu vc. Single Volumes for Team
         * @apiName GetSingleListVolumesTeam
         * @apiGroup Teams
         */
        .get('/teams/:id/volumes/:idu', authenticate(), WrapperPersistenceAppDefault.findOne)
        /**
         * @api {put} /teams/:id/volumes/:idu vd. Update all Volumes for Team
         * @apiName UpdateSingleListVolumesTeam
         * @apiGroup Teams
         */
        .put('/teams/:id/volumes/:idu', authenticate(), WrapperPersistenceAppDefault.update)
        /**
         * @api {patch} /teams/:id/volumes/:idu ve. Partial Volumes for Team
         * @apiName GetPartialSingleListVolumesTeam
         * @apiGroup Teams
         */
        .patch('/teams/:id/volumes/:idu', authenticate(), WrapperPersistenceAppDefault.patch)
        /**
         * @api {delete} /teams/:id/volumes/:idu vf. Single Volumes for Team
         * @apiName DeleteSingleListVolumesTeam
         * @apiGroup Teams
         */
        .delete('/teams/:id/volumes/:idu', authenticate(), WrapperPersistenceAppDefault.remove)
        /**
         * @api {post} /teams/:id/volumes/ vg. Create Volumes for Team
         * @apiName PostSingleListVolumesTeam
         * @apiGroup Teams
         */
        .post('/teams/:id/volumes', authenticate(), WrapperPersistenceAppDefault.create)

        /**
         * Roles
         */
         /**
          * @api {post} /teams/:id/volumes/:idu/roles vh. Create access role
          * @apiName GetSingleListVolumesTeam
          * @apiGroup Teams
          */
        .post('/teams/:id/volumes/:idu/roles', authenticate(), WrapperAccessApp.create)
        /**
         * @api {put} /teams/:id/volumes/:idu/roles vi. Update all access role
         * @apiName GetSingleListVolumesTeam
         * @apiGroup Teams
         */
        .put('/teams/:id/volumes/:idu/roles', authenticate(), WrapperAccessApp.update)
        /**
         * @api {put} /teams/:id/volumes/:idu/roles/:ida vj. Update access role
         * @apiName GetSingleListVolumesTeam
         * @apiGroup Teams
         */
        .put('/teams/:id/volumes/:idu/roles/:ida', authenticate(), WrapperAccessApp.updateSingle)
        /**
         * @api {delete} /teams/:id/volumes/:idu/roles/:ida vl. Delete access role
         * @apiName GetSingleListVolumesTeam
         * @apiGroup Teams
         */
        .delete('/teams/:id/volumes/:idu/roles/:ida', authenticate(), WrapperAccessApp.remove);

};
