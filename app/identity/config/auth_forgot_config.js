'use strict';

const {ExtractJwt} = require('passport-jwt');

module.exports = {
    jwtSecret: {
        secretOrKey: process.env.MAESTRO_SECRETJWT_FORGOT || 'defaultSecretKey',
        jwtFromRequest: ExtractJwt.fromAuthHeader()
    },
    jwtSession: {
        session: false
    }
};
