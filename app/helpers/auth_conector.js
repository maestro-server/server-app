
import passport from "passport";
import {Strategy, ExtractJwt} from "passport-jwt";
import UserRepository from "../repositories/usersRepository";

import config from '../helpers/auth_config';


module.exports = function(req, res, next) {
    let strategy = new Strategy(config.jwtSecret, function (payload, done) {

        let _id = payload._id;

        if(_id) {
            new UserRepository()
                .findOne({_id})
                .then(e => {
                    if (e) {
                        return done(null, e.get());
                    }

                    return done(new Error("User not found"), false);
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
