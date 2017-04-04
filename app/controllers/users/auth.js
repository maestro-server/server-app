'use strict';

import AuthService from '../../services/authService';

import authenticate from '../../middlewares/authenticate';


module.exports = function (router) {

    router
        .post('/', function (req, res, next) {

            AuthService
                .authenticate(req.body)
                .then(e => res.json(e))
                .catch(function (e) {
                    next(e);
                });

        });


};
