'use strict';

const authenticate = require('middlewares/authenticate');

const app = require('../application/');
const roles = require('../application/roles');

module.exports = function (router) {

    router
        .get('/', authenticate(), app.list)

        .get('/:id', authenticate(), app.single)

        .patch('/:id', authenticate(), app.update)

        .delete('/:id', authenticate(), app.delete)

        .post('/', authenticate(), app.create)

        /**
         * Roles
         */

        .post('/:id/roles', authenticate(), roles.create)

        .put('/:id/roles/:idu', authenticate(), roles.update)

        .delete('/:id/roles/:idu', authenticate(), roles.delete);

};
