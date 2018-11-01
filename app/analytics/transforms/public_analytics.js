'use strict';

const jwt = require('jwt-simple');
const config = require('analytics/config/auth_public_analytics');

module.exports = function (id, name) {

    const timestamp = new Date().getTime();
    const body = {name, id, timestamp};
    const  token = jwt.encode(body, config.jwtSecret.secretOrKey);

    return {
        id,
        token,
        timestamp
    };
};
