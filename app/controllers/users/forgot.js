'use strict';

import AuthService from '../../services/authService';

import authenticate from '../../middlewares/authenticate';


module.exports = function (router) {

    router
        .post('/', function (req, res, next) {

          AuthService
              .forgot(req.body)
              .then(e => res.status(204).json(e))
              .catch(function (e) {
                  next(e);
              });

        })

        .put('/change', function (req, res, next) {

          AuthService
              .changePassword(req.body, req.header)
              .then(e => res.status(202).json(e))
              .catch(function (e) {
                  next(e);
              });

        });


};