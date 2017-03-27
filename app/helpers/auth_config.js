import {ExtractJwt} from "passport-jwt";

module.exports = {
    jwtSecret: {
        secretOrKey: 'sdfs',
        jwtFromRequest: ExtractJwt.fromAuthHeader()
    },
    jwtSession: {
        session: false
    }
};
