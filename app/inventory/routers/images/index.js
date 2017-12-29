'use strict';

const authenticate = require('identity/middlewares/authenticate');

const Images = require('../../entities/Images');
const Team = require('identity/entities/Teams');

const WrapperPersistenceApp = require('core/applications/wrapperPersistenceApplication')(Images)(Team);
const WrapperPersistenceAppDefault = WrapperPersistenceApp()();

const AccessApp = require('core/applications/accessApplication');
const WrapperAccessApp = WrapperPersistenceApp(AccessApp)();

module.exports = function (router) {

    router
        .get('/teams/:id/images', authenticate(), WrapperPersistenceAppDefault.find)

        .get('/teams/:id/images/count', authenticate(), WrapperPersistenceAppDefault.count)

        .get('/teams/:id/images/:idu', authenticate(), WrapperPersistenceAppDefault.findOne)

        .put('/teams/:id/images/:idu', authenticate(), WrapperPersistenceAppDefault.update)

        .patch('/teams/:id/images/:idu', authenticate(), WrapperPersistenceAppDefault.patch)

        .delete('/teams/:id/images/:idu', authenticate(), WrapperPersistenceAppDefault.remove)

        .post('/teams/:id/images', authenticate(), WrapperPersistenceAppDefault.create)

        /**
         * Roles
         */

        .post('/teams/:id/images/:idu/roles', authenticate(), WrapperAccessApp.create)

        .put('/teams/:id/images/:idu/roles', authenticate(), WrapperAccessApp.update)

        .put('/teams/:id/images/:idu/roles/:ida', authenticate(), WrapperAccessApp.updateSingle)

        .delete('/teams/:id/images/:idu/roles/:ida', authenticate(), WrapperAccessApp.remove);

};
