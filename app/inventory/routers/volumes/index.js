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
        .get('/teams/:id/volumes', authenticate(), WrapperPersistenceAppDefault.find)

        .get('/teams/:id/volumes/count', authenticate(), WrapperPersistenceAppDefault.count)

        .get('/teams/:id/volumes/:idu', authenticate(), WrapperPersistenceAppDefault.findOne)

        .put('/teams/:id/volumes/:idu', authenticate(), WrapperPersistenceAppDefault.update)

        .patch('/teams/:id/volumes/:idu', authenticate(), WrapperPersistenceAppDefault.patch)

        .delete('/teams/:id/volumes/:idu', authenticate(), WrapperPersistenceAppDefault.remove)

        .post('/teams/:id/volumes', authenticate(), WrapperPersistenceAppDefault.create)

        /**
         * Roles
         */

        .post('/teams/:id/volumes/:idu/roles', authenticate(), WrapperAccessApp.create)

        .put('/teams/:id/volumes/:idu/roles', authenticate(), WrapperAccessApp.update)

        .put('/teams/:id/volumes/:idu/roles/:ida', authenticate(), WrapperAccessApp.updateSingle)

        .delete('/teams/:id/volumes/:idu/roles/:ida', authenticate(), WrapperAccessApp.remove);

};
