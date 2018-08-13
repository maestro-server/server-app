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
        .get('/teams/:id/graphs', authenticate(), WrapperPersistenceApp()().find)

        .get('/teams/:id/graphs/count', authenticate(), WrapperPersistenceApp()().count)

        .get('/teams/:id/graphs/:idu', authenticate(), WrapperPersistenceApp()().findOne)

        .put('/teams/:id/graphs/:idu', authenticate(), WrapperPersistenceApp()().update)

        .patch('/teams/:id/graphs/:idu', authenticate(), WrapperPersistenceApp()().patch)

        .delete('/teams/:id/graphs/:idu', authenticate(), WrapperPersistenceApp()().remove)

        .post('/teams/:id/graphs', authenticate(), WrapperPersistenceAppGraphs().create)

        /**
         * Roles
         */

        .post('/teams/:id/graphs/:idu/roles', authenticate(), WrapperAccessApp.create)

        .put('/teams/:id/graphs/:idu/roles', authenticate(), WrapperAccessApp.update)

        .put('/teams/:id/graphs/:idu/roles/:ida', authenticate(), WrapperAccessApp.updateSingle)

        .delete('/teams/:id/graphs/:idu/roles/:ida', authenticate(), WrapperAccessApp.remove);

};
