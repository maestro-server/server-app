import {ExtractJwt} from "passport-jwt";

module.exports = {
    jwtSecret: {
        secretOrKey: process.env.SECRETJWT_FORGOT,
        jwtFromRequest: ExtractJwt.fromAuthHeader()
    },
    jwtSession: {
        session: false
    }
};
