'use strict';

const {ExtractJwt} = require('passport-jwt');

module.exports = {
    jwtSecret: {
        secretOrKey: process.env.SECRETJWT || "developerTOKEN",
        jwtFromRequest: ExtractJwt.fromAuthHeader()
    },
    jwtSession: {
        session: false
    }
};
