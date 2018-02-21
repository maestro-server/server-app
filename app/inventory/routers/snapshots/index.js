'use strict';

const authenticate = require('identity/middlewares/authenticate');

const Snapshots = require('../../entities/Snapshots');
const Team = require('identity/entities/Teams');

const WrapperPersistenceApp = require('core/applications/wrapperPersistenceApplication')(Snapshots)(Team);
const WrapperPersistenceAppDefault = WrapperPersistenceApp()();

const AccessApp = require('core/applications/accessApplication');
const WrapperAccessApp = WrapperPersistenceApp(AccessApp)();

module.exports = function (router) {

    router
    /**
     * @api {get} /teams/:id/snapshots sna. List Snapshots for Team
     * @apiName GetListSnapshots
     * @apiGroup Teams
     * @apiDescription Use for teams scope, have be all actions, params and option in /snapshots,
     *
     * @apiParam (Param) {String} id Team unique ID.
     * @apiParam (Param) {String} idu Snapshot unique ID.
     */
        .get('/teams/:id/snapshots', authenticate(), WrapperPersistenceApp()().find)
        /**
         * @api {get} /teams/:id/snapshots/count snb. Count Snapshots for Team
         * @apiName GetCountListSnapshotsTeam
         * @apiGroup Teams
         */
        .get('/teams/:id/snapshots/count', authenticate(), WrapperPersistenceAppDefault.count)
        /**
         * @api {get} /teams/:id/snapshots/:idu snc. Single Snapshots for Team
         * @apiName GetSingleListSnapshotsTeam
         * @apiGroup Teams
         */
        .get('/teams/:id/snapshots/:idu', authenticate(), WrapperPersistenceAppDefault.findOne)
        /**
         * @api {put} /teams/:id/snapshots/:idu snd. Update all Snapshots for Team
         * @apiName UpdateSingleListSnapshotsTeam
         * @apiGroup Teams
         */
        .put('/teams/:id/snapshots/:idu', authenticate(), WrapperPersistenceAppDefault.update)
        /**
         * @api {patch} /teams/:id/snapshots/:idu sne. Partial Snapshots for Team
         * @apiName GetPartialSingleListSnapshotsTeam
         * @apiGroup Teams
         */
        .patch('/teams/:id/snapshots/:idu', authenticate(), WrapperPersistenceAppDefault.patch)
        /**
         * @api {delete} /teams/:id/snapshots/:idu snf. Single Snapshots for Team
         * @apiName DeleteSingleListSnapshotsTeam
         * @apiGroup Teams
         */
        .delete('/teams/:id/snapshots/:idu', authenticate(), WrapperPersistenceAppDefault.remove)
        /**
         * @api {post} /teams/:id/snapshots/ sng. Create Snapshots for Team
         * @apiName PostSingleListSnapshotsTeam
         * @apiGroup Teams
         */
        .post('/teams/:id/snapshots', authenticate(), WrapperPersistenceAppDefault.create)

        /**
         * Roles
         */
        /**
         * @api {post} /teams/:id/snapshots/:idu/roles snh. Create access role
         * @apiName GetSingleListSnapshotsTeam
         * @apiGroup Teams
         */
        .post('/teams/:id/snapshots/:idu/roles', authenticate(), WrapperAccessApp.create)
        /**
         * @api {put} /teams/:id/snapshots/:idu/roles sni. Update all access role
         * @apiName GetSingleListSnapshotsTeam
         * @apiGroup Teams
         */
        .put('/teams/:id/snapshots/:idu/roles', authenticate(), WrapperAccessApp.update)
        /**
         * @api {put} /teams/:id/snapshots/:idu/roles/:ida snj. Update access role
         * @apiName GetSingleListSnapshotsTeam
         * @apiGroup Teams
         */
        .put('/teams/:id/snapshots/:idu/roles/:ida', authenticate(), WrapperAccessApp.updateSingle)
        /**
         * @api {delete} /teams/:id/snapshots/:idu/roles/:ida snl. Delete access role
         * @apiName GetSingleListSnapshotsTeam
         * @apiGroup Teams
         */
        .delete('/teams/:id/snapshots/:idu/roles/:ida', authenticate(), WrapperAccessApp.remove);

};
