'use strict';

const authenticate = require('identity/middlewares/authenticate');

const Project = require('../../entities/Project');
const Team = require('identity/entities/Teams');

const WrapperPersistenceApp = require('core/applications/wrapperPersistenceApplication')(Project)(Team);

const AccessApp = require('core/applications/accessApplication');
const WrapperAccessApp = WrapperPersistenceApp(AccessApp)();

module.exports = function (router) {

    router
    /**
     * @api {get} /teams/:id/projects sa. List Projects for Team
     * @apiName GetListProjects
     * @apiGroup Teams
     * @apiDescription Use for teams scope, have be all actions, params and option in /projects,
     *
     * @apiParam (Param) {String} id Team unique ID.
     * @apiParam (Param) {String} idu Project unique ID.
     */
        .get('/teams/:id/projects', authenticate(), WrapperPersistenceApp()().find)
        /**
         * @api {get} /teams/:id/projects/count sb. Count Projects for Team
         * @apiName GetCountListProjectsTeam
         * @apiGroup Teams
         */
        .get('/teams/:id/projects/count', authenticate(), WrapperPersistenceApp()().count)
        /**
         * @api {get} /teams/:id/projects/:idu sc. Single Projects for Team
         * @apiName GetSingleListProjectsTeam
         * @apiGroup Teams
         */
        .get('/teams/:id/projects/:idu', authenticate(), WrapperPersistenceApp()().findOne)
        /**
         * @api {put} /teams/:id/projects/:idu sd. Update all Projects for Team
         * @apiName UpdateSingleListProjectsTeam
         * @apiGroup Teams
         */
        .put('/teams/:id/projects/:idu', authenticate(), WrapperPersistenceApp()().update)
        /**
         * @api {patch} /teams/:id/projects/:idu se. Partial Projects for Team
         * @apiName GetPartialSingleListProjectsTeam
         * @apiGroup Teams
         */
        .patch('/teams/:id/projects/:idu', authenticate(), WrapperPersistenceApp()().patch)
        /**
         * @api {delete} /teams/:id/projects/:idu sf. Single Projects for Team
         * @apiName DeleteSingleListProjectsTeam
         * @apiGroup Teams
         */
        .delete('/teams/:id/projects/:idu', authenticate(), WrapperPersistenceApp()().remove)
        /**
         * @api {post} /teams/:id/projects/ sg. Create Projects for Team
         * @apiName PostSingleListProjectsTeam
         * @apiGroup Teams
         */
        .post('/teams/:id/projects', authenticate(), WrapperPersistenceApp()().create)

        /**
         * Roles
         */
        /**
         * @api {post} /teams/:id/projects/:idu/roles sh. Create access role
         * @apiName GetSingleListProjectsTeam
         * @apiGroup Teams
         */
        .post('/teams/:id/projects/:idu/roles', authenticate(), WrapperAccessApp.create)
        /**
         * @api {put} /teams/:id/projects/:idu/roles si. Update all access role
         * @apiName GetSingleListProjectsTeam
         * @apiGroup Teams
         */
        .put('/teams/:id/projects/:idu/roles', authenticate(), WrapperAccessApp.update)
        /**
         * @api {put} /teams/:id/projects/:idu/roles/:ida sj. Update access role
         * @apiName GetSingleListProjectsTeam
         * @apiGroup Teams
         */
        .put('/teams/:id/projects/:idu/roles/:ida', authenticate(), WrapperAccessApp.updateSingle)
        /**
         * @api {delete} /teams/:id/projects/:idu/roles/:ida sl. Delete access role
         * @apiName GetSingleListProjectsTeam
         * @apiGroup Teams
         */
        .delete('/teams/:id/projects/:idu/roles/:ida', authenticate(), WrapperAccessApp.remove);

};
