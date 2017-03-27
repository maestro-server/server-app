'use strict';

import AuthService from '../../services/authService';


module.exports = function (router) {

    router
        .post('/token', function (req, res, next) {

            AuthService
                .authenticate(req.body)
                .then(e => res.json(e))
                .catch(function(e) {
                    next(e);
                });

        });


};
