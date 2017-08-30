'use strict';

const _ = require('lodash');
const passport = require('passport');
const {Strategy} = require('passport-jwt');

const User = require('identity/profile/entities/Users');
const DBRepository = require('core/repositories/DBRepository');

const config = require('identity/profile/config/auth_config');
const PermissionError = require('core/errors/factoryError')('PermissionError');

module.exports = function() {
  const strategy = new Strategy(config.jwtSecret, function (payload, done) {
        const {_id} = payload;

        if(_id) {
            DBRepository(User)
                .findOne({_id}, ['_id', 'email'])
                .then((e) => {
                    if (!_.isEmpty(e)) {
                        return done(null, e);
                    }
                    return done(new PermissionError("User not found"), false);
                })
                .catch(error => done(error, null));
        }

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
