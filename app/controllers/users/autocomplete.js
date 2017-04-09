'use strict';

const UsersService = require('../../services/usersService');

const authenticate = require('../../middlewares/authenticate');


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
