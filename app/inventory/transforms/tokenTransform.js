'use strict';

const jwt = require('jwt-simple');
const config = require('identity/config/auth_config');

module.exports = (user) => jwt.encode(user, config.jwtSecret.secretOrKey);
