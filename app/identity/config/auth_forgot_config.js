'use strict';

const {ExtractJwt} = require('passport-jwt');

module.exports = {
    jwtSecret: {
        secretOrKey: process.env.SECRETJWT_FORGOT,
        jwtFromRequest: ExtractJwt.fromAuthHeader()
    },
    jwtSession: {
        session: false
    }
};