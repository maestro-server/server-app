'use strict';

const authenticate = require('identity/middlewares/authenticate');

const TaskTemplate = require('../../entities/TaskTemplate');
const Team = require('identity/entities/Teams');

const WrapperPersistenceApp = require('core/applications/wrapperPersistenceApplication')(TaskTemplate)(Team);

const AccessApp = require('core/applications/accessApplication');
const WrapperAccessApp = WrapperPersistenceApp(AccessApp)();

module.exports = function (router) {

    router
        .get('/teams/:id/task_template', authenticate(), WrapperPersistenceApp()().find)

        .get('/teams/:id/task_template/count', authenticate(), WrapperPersistenceApp()().count)

        .get('/teams/:id/task_template/:idu', authenticate(), WrapperPersistenceApp()().findOne)

        .put('/teams/:id/task_template/:idu', authenticate(), WrapperPersistenceApp()().update)

        .patch('/teams/:id/task_template/:idu', authenticate(), WrapperPersistenceApp()().patch)

        .delete('/teams/:id/task_template/:idu', authenticate(), WrapperPersistenceApp()().remove)

        .post('/teams/:id/task_template', authenticate(), WrapperPersistenceApp()().create)

        /**
         * Roles
         */

        .post('/teams/:id/task_template/:idu/roles', authenticate(), WrapperAccessApp.create)

        .put('/teams/:id/task_template/:idu/roles', authenticate(), WrapperAccessApp.update)

        .put('/teams/:id/task_template/:idu/roles/:ida', authenticate(), WrapperAccessApp.updateSingle)

        .delete('/teams/:id/task_template/:idu/roles/:ida', authenticate(), WrapperAccessApp.remove);



};
