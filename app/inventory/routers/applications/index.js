'use strict';

const authenticate = require('identity/middlewares/authenticate');

const App = require('../../entities/Application');
const Team = require('identity/entities/Teams');

const PersistenceAppApplications = require('../../applications/persistenceApplications');
const WrapperPersistenceApp = require('core/applications/wrapperPersistenceApplication')(Application)(Team);
const WrapperPersistenceAppDefault = WrapperPersistenceApp()();

const AccessApp = require('core/applications/accessApplication');
const WrapperAccessApp = WrapperPersistenceApp(AccessApp)();

module.exports = function (router) {

    router
        /**
         * @api {get} /teams/:id/applications aa. List App for Team
         * @apiName GetListTeam
         * @apiGroup Teams
         * @apiDescription Use for teams scope, have be all actions, params and option in /applications,
         *
         * @apiParam (Param) {String} id Team unique ID.
         * @apiParam (Param) {String} idu App unique ID.
         */
        .get('/teams/:id/applications', authenticate(), WrapperPersistenceApp(PersistenceAppApplications)('findApplications').find)
        /**
         * @api {get} /teams/:id/applications/count ab. Count App for Team
         * @apiName GetCountListTeam
         * @apiGroup Teams
         */
        .get('/teams/:id/applications/count', authenticate(), WrapperPersistenceAppDefault.count)
        /**
         * @api {get} /teams/:id/applications/:idu ac. Single App for Team
         * @apiName GetSingleListTeam
         * @apiGroup Teams
         */
        .get('/teams/:id/applications/:idu', authenticate(), WrapperPersistenceAppDefault.findOne)
        /**
         * @api {put} /teams/:id/applications/:idu ad. Single App for Team
         * @apiName UpdateSingleListTeam
         * @apiGroup Teams
         */
        .put('/teams/:id/applications/:idu', authenticate(), WrapperPersistenceAppDefault.update)
        /**
         * @api {patch} /teams/:id/applications/:idu ae. Partial App for Team
         * @apiName GetPartialSingleListTeam
         * @apiGroup Teams
         */
        .patch('/teams/:id/applications/:idu', authenticate(), WrapperPersistenceAppDefault.patch)
        /**
         * @api {delete} /teams/:id/applications/:idu af. Single App for Team
         * @apiName DeleteSingleListTeam
         * @apiGroup Teams
         */
        .delete('/teams/:id/applications/:idu', authenticate(), WrapperPersistenceAppDefault.remove)

        /**
         * @api {post} /teams/:id/applications/ ag. App for Team
         * @apiName PostSingleListTeam
         * @apiGroup Teams
         */
        .post('/teams/:id/applications', authenticate(), WrapperPersistenceAppDefault.create)

        /**
         * Roles
         */
         /**
          * @api {post} /teams/:id/applications/:idu/roles ah. Create access role
          * @apiName GetSingleListTeam
          * @apiGroup Teams
          */
        .post('/teams/:id/applications/:idu/roles', authenticate(), WrapperAccessApp.create)
        /**
         * @api {put} /teams/:id/applications/:idu/roles ai. Update all access role
         * @apiName GetSingleListTeam
         * @apiGroup Teams
         */
        .put('/teams/:id/applications/:idu/roles', authenticate(), WrapperAccessApp.update)
        /**
         * @api {put} /teams/:id/applications/:idu/roles/:ida aj. Update access role
         * @apiName GetSingleListTeam
         * @apiGroup Teams
         */
        .put('/teams/:id/applications/:idu/roles/:ida', authenticate(), WrapperAccessApp.updateSingle)
        /**
         * @api {delete} /teams/:id/applications/:idu/roles/:ida al. Delete access role
         * @apiName GetSingleListTeam
         * @apiGroup Teams
         */
        .delete('/teams/:id/applications/:idu/roles/:ida', authenticate(), WrapperAccessApp.remove);

};
