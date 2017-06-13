'use strict';

const authenticate = require('core/middlewares/authenticate');

const app = require('../application/');


module.exports = function (router) {

    router
        .get('/', authenticate(), app.list)

        .get('/autocomplete', authenticate(), app.autocomplete)

        .get('/:id', authenticate(), app.single)

        .patch('/:id', authenticate(), app.update)

        .delete('/:id', authenticate(), app.delete)

        .post('/', authenticate(), app.create);

};
