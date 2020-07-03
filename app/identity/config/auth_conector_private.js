'use strict';

const _ = require('lodash');
const {Passport} = require('passport');

const {Strategy} = require('passport-jwt');
const config = require('./auth_config_private')();
const PermissionError = require('core/errors/factoryError')('PermissionError');

module.exports = function () {
    const passport = new Passport();

    const strategy = new Strategy(config.jwtSecret, function (payload, done) {

        const {noauth} = payload;

        const countern = process.env.MAESTRO_NOAUTH || "defaultSecretNoAuthToken"

        if (noauth === countern) {
            return done(null, payload);
        }
        return done(new PermissionError("Invalid token"), false);

    });

    passport.use(strategy);

    return {
        initialize: () => {
            return passport.initialize();
        },
        authenticate: () => {
            return passport.authenticate("jwt", config.jwtSession);
        }
    };
};
