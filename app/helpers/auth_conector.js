import passport from "passport";
import {Strategy, ExtractJwt} from "passport-jwt";
import UserRepository from "../repositories/usersRepository";

import config from '../helpers/auth_config';

module.exports = function() {
    let strategy = new Strategy(config.jwtSecret, function (payload, done) {

        let _id = payload.id;

        new UserRepository()
            .findOne({_id})
            .then(e => {
                if (e) {
                    return done(null, e);
                }
                return done(null, false);
            })
            .catch(error => done(error, null));

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
