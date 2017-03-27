import passport from "passport";
import {Strategy, ExtractJwt} from "passport-jwt";
import UserRepository from "../repositories/usersRepository";

import config from '../helpers/auth_config';


module.exports = function (res, req) {
    return middleAuth().initialize();
    next();
};

function middleAuth() {
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
        initialize: function () {
            return passport.initialize();
        },
        authenticate: function () {
            return passport.authenticate("jwt", config.jwtSession);
        }
    };
}
;
