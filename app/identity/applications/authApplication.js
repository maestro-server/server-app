'use strict';

const AuthService = require('identity/services/AuthService');

const AuthApp = (Entity) => {

    return {
        login (req, res, next) {

            AuthService(Entity)
                .authenticate(req.body)
                .then(e => res.json(e))
                .catch(function (e) {
                    next(e);
                });

        },

        updateExistPassword (req, res, next) {

            AuthService(Entity)
                .updateExistPassword(req.body, req.user)
                .then(e => res.status(201).json(e))
                .catch(function (e) {
                    next(e);
                });

        },

        forgot (req, res, next) {

            AuthService(Entity)
                .forgot(req.body)
                .then(e => res.status(204).json(e))
                .catch(function (e) {
                    next(e);
                });
        },

        updateForgotPassword (req, res, next) {

            AuthService(Entity)
                .updateForgotPassword(req.body, req.header)
                .then(e => res.status(204).json(e))
                .catch(function (e) {
                    next(e);
                });

        }
    };
};

module.exports = AuthApp;
