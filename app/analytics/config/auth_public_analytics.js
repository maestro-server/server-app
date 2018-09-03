'use strict';

const {ExtractJwt} = require('passport-jwt');

module.exports = {
    jwtSecret: {
        secretOrKey: process.env.MAESTRO_SECRETJWT_PUBLIC_ANALYTICS || 'defaultSecretKey',
        jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt')
    },
    jwtSession: {
        session: false
    }
};
