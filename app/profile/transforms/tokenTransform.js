'use strict';

const jwt = require('jwt-simple');
const config = require('profile/config/auth_config');

module.exports = (user) => ({
    token: jwt.encode(user, config.jwtSecret.secretOrKey),
    user
});
