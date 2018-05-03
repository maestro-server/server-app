'use strict';

const authenticate = require('identity/middlewares/authenticate');

const Jobs = require('../../entities/Job');
const Team = require('identity/entities/Teams');

const WrapperPersistenceApp = require('core/applications/wrapperPersistenceApplication')(Jobs)(Team);

const AccessApp = require('core/applications/accessApplication');
const WrapperAccessApp = WrapperPersistenceApp(AccessApp)();

module.exports = function (router) {

    router
        .get('/teams/:id/jobs', authenticate(), WrapperPersistenceApp()().find)

        .get('/teams/:id/jobs/count', authenticate(), WrapperPersistenceApp()().count)

        .get('/teams/:id/jobs/:idu', authenticate(), WrapperPersistenceApp()().findOne)

        .put('/teams/:id/jobs/:idu', authenticate(), WrapperPersistenceApp()().update)

        .patch('/teams/:id/jobs/:idu', authenticate(), WrapperPersistenceApp()().patch)

        .delete('/teams/:id/jobs/:idu', authenticate(), WrapperPersistenceApp()().remove)

        .post('/teams/:id/jobs', authenticate(), WrapperPersistenceApp()().create)

        /**
         * Roles
         */

        .post('/teams/:id/jobs/:idu/roles', authenticate(), WrapperAccessApp.create)

        .put('/teams/:id/jobs/:idu/roles', authenticate(), WrapperAccessApp.update)

        .put('/teams/:id/jobs/:idu/roles/:ida', authenticate(), WrapperAccessApp.updateSingle)

        .delete('/teams/:id/jobs/:idu/roles/:ida', authenticate(), WrapperAccessApp.remove);



};
