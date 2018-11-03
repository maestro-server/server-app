'use strict';

const authenticate = require('identity/middlewares/authenticate');

const Graph = require('../../entities/Graph');
const Team = require('identity/entities/Teams');

const PersistenceGraph = require('../../applications/persistenceGraph');
const WrapperPersistenceApp = require('core/applications/wrapperPersistenceApplication')(Graph)(Team);
const WrapperPersistenceAppGraphs = WrapperPersistenceApp(PersistenceGraph);

const AccessApp = require('core/applications/accessApplication');
const WrapperAccessApp = WrapperPersistenceApp()(AccessApp);

module.exports = function (router) {

    router
    /**
     * @api {get} /teams/:id/graphs sa. List Graphs for Team
     * @apiName GetListGraphs
     * @apiGroup Teams
     * @apiDescription Use for teams scope, have be all actions, params and option in /clients,
     *
     * @apiParam (Param) {String} id Team unique ID.
     * @apiParam (Param) {String} idu Graph unique ID.
     */
        .get('/teams/:id/graphs', authenticate(), WrapperPersistenceAppGraphs().find)
        /**
         * @api {get} /teams/:id/graphs/count sb. Count Graphs for Team
         * @apiName GetCountListGraphsTeam
         * @apiGroup Teams
         */
        .get('/teams/:id/graphs/count', authenticate(), WrapperPersistenceApp()().count)
        /**
         * @api {get} /teams/:id/graphs/:idu sc. Single Graphs for Team
         * @apiName GetSingleListGraphsTeam
         * @apiGroup Teams
         */
        .get('/teams/:id/graphs/:idu', authenticate(), WrapperPersistenceApp()().findOne)
        /**
         * @api {put} /teams/:id/graphs/:idu sd. Update all Graphs for Team
         * @apiName UpdateSingleListGraphsTeam
         * @apiGroup Teams
         */
        .put('/teams/:id/graphs/:idu', authenticate(), WrapperPersistenceAppGraphs().update)
        /**
         * @api {patch} /teams/:id/graphs/:idu se. Partial Graphs for Team
         * @apiName GetPartialSingleListGraphsTeam
         * @apiGroup Teams
         */
        .patch('/teams/:id/graphs/:idu', authenticate(), WrapperPersistenceApp()().patch)
        /**
         * @api {delete} /teams/:id/graphs/:idu sf. Single Graphs for Team
         * @apiName DeleteSingleListGraphsTeam
         * @apiGroup Teams
         */
        .delete('/teams/:id/graphs/:idu', authenticate(), WrapperPersistenceApp()().remove)
        /**
         * @api {post} /teams/:id/graphs/:idu/public sg. Allowed public Graphs for Team
         * @apiName PostSingleListGraphsTeam
         * @apiGroup Teams
         */
        .post('/teams/:id/graphs/:idu/public', authenticate(), WrapperPersistenceAppGraphs('createPublicToken').create)
        /**
         * @api {post} /teams/:id/graphs/ sg. Create Graphs for Team
         * @apiName PostSingleListGraphsTeam
         * @apiGroup Teams
         */
        .post('/teams/:id/graphs', authenticate(), WrapperPersistenceAppGraphs().create)

        /**
         * Roles
         */
        /**
         * @api {post} /teams/:id/graphs/:idu/roles sh. Create access role
         * @apiName GetSingleListGraphsTeam
         * @apiGroup Teams
         */
        .post('/teams/:id/graphs/:idu/roles', authenticate(), WrapperAccessApp.create)
        /**
         * @api {put} /teams/:id/graphs/:idu/roles si. Update all access role
         * @apiName GetSingleListGraphsTeam
         * @apiGroup Teams
         */
        .put('/teams/:id/graphs/:idu/roles', authenticate(), WrapperAccessApp.update)
        /**
         * @api {put} /teams/:id/graphs/:idu/roles/:ida sj. Update access role
         * @apiName GetSingleListGraphsTeam
         * @apiGroup Teams
         */
        .put('/teams/:id/graphs/:idu/roles/:ida', authenticate(), WrapperAccessApp.updateSingle)
        /**
         * @api {delete} /teams/:id/graphs/:idu/roles/:ida sl. Delete access role
         * @apiName GetSingleListGraphsTeam
         * @apiGroup Teams
         */
        .delete('/teams/:id/graphs/:idu/roles/:ida', authenticate(), WrapperAccessApp.remove);

};
