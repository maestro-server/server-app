'use strict';

const passport = require('passport');
const {Strategy} = require('passport-jwt');
const UserRepository = require('core/repositories/usersRepository');

const config = require('core/helpers/auth_config');

const PermissionError = require('core/errors/permissionError');


module.exports = function() {
    let strategy = new Strategy(config.jwtSecret, function (payload, done) {

        let _id = payload._id;

        if(_id) {
            new UserRepository()
                .findOne({_id})
                .then(e => {
                    if (e) {
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
