'use strict';

const authenticate = require('identity/middlewares/authenticate');

const Project = require('../../entities/Project');
const Team = require('identity/entities/Teams');

const WrapperPersistenceApp = require('core/applications/wrapperPersistenceApplication')(Project)(Team);

const AccessApp = require('core/applications/accessApplication');
const WrapperAccessApp = WrapperPersistenceApp(AccessApp)();

module.exports = function (router) {

    router
        .get('/teams/:id/projects', authenticate(), WrapperPersistenceApp()().find)

        .get('/teams/:id/projects/count', authenticate(), WrapperPersistenceApp()().count)

        .get('/teams/:id/projects/:idu', authenticate(), WrapperPersistenceApp()().findOne)

        .put('/teams/:id/projects/:idu', authenticate(), WrapperPersistenceApp()().update)

        .patch('/teams/:id/projects/:idu', authenticate(), WrapperPersistenceApp()().patch)

        .delete('/teams/:id/projects/:idu', authenticate(), WrapperPersistenceApp()().remove)

        .post('/teams/:id/projects', authenticate(), WrapperPersistenceApp()().create)

        /**
         * Roles
         */

        .post('/teams/:id/projects/:idu/roles', authenticate(), WrapperAccessApp.create)

        .put('/teams/:id/projects/:idu/roles', authenticate(), WrapperAccessApp.update)

        .put('/teams/:id/projects/:idu/roles/:ida', authenticate(), WrapperAccessApp.updateSingle)

        .delete('/teams/:id/projects/:idu/roles/:ida', authenticate(), WrapperAccessApp.remove);

};
