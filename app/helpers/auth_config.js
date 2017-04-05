import {ExtractJwt} from "passport-jwt";

module.exports = {
    jwtSecret: {
        secretOrKey: process.env.SECRETJWT,
        jwtFromRequest: ExtractJwt.fromAuthHeader()
    },
    jwtSession: {
        session: false
    }
};
