'use strict';

const authenticate = require('identity/middlewares/authenticate');

const Playbooks = require('../../entities/Playbook');
const Team = require('identity/entities/Teams');

const WrapperPersistenceApp = require('core/applications/wrapperPersistenceApplication')(Playbooks)(Team);

const AccessApp = require('core/applications/accessApplication');
const WrapperAccessApp = WrapperPersistenceApp(AccessApp)();

module.exports = function (router) {

    router
        .get('/teams/:id/playbooks', authenticate(), WrapperPersistenceApp()().find)

        .get('/teams/:id/playbooks/count', authenticate(), WrapperPersistenceApp()().count)

        .get('/teams/:id/playbooks/:idu', authenticate(), WrapperPersistenceApp()().findOne)

        .put('/teams/:id/playbooks/:idu', authenticate(), WrapperPersistenceApp()().update)

        .patch('/teams/:id/playbooks/:idu', authenticate(), WrapperPersistenceApp()().patch)

        .delete('/teams/:id/playbooks/:idu', authenticate(), WrapperPersistenceApp()().remove)

        .post('/teams/:id/playbooks', authenticate(), WrapperPersistenceApp()().create)

        /**
         * Roles
         */

        .post('/teams/:id/playbooks/:idu/roles', authenticate(), WrapperAccessApp.create)

        .put('/teams/:id/playbooks/:idu/roles', authenticate(), WrapperAccessApp.update)

        .put('/teams/:id/playbooks/:idu/roles/:ida', authenticate(), WrapperAccessApp.updateSingle)
 
        .delete('/teams/:id/playbooks/:idu/roles/:ida', authenticate(), WrapperAccessApp.remove);



};
