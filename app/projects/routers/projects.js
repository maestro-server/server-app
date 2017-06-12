'use strict';

const authenticate = require('middlewares/authenticate');

const app = require('../application/');


module.exports = function (router) {

    router
        .get('/', authenticate(), app.list)

        .get('/:id', authenticate(), app.single)

        .patch('/:id', authenticate(), app.update)

        .delete('/:id', authenticate(), app.delete)

        .post('/', authenticate(), app.create);

};
