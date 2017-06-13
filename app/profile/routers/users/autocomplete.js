'use strict';

const UsersService = require('core/services/usersService');

const authenticate = require('core/middlewares/authenticate');


module.exports = function (router) {

    router
        .get('/', authenticate(), function (req, res, next) {

            UsersService.autocomplete(req.query, req.user)
                .then(e => res.json(e))
                .catch(function(e) {
                    next(e);
                });

        });


};
