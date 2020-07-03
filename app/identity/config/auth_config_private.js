'use strict';

const {ExtractJwt} = require('passport-jwt');

module.exports = () => {
    const secret = process.env.MAESTRO_SECRETJWT_PRIVATE;

    return {
        jwtSecret: {
            secretOrKey: secret || 'defaultSecretKeyPrivate',
            jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt')
        },
        jwtSession: {
            session: false
        }
    };
};
