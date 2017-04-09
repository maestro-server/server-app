'use strict';

const jwt = require('jwt-simple');
const config = require('../../helpers/auth_config');

module.exports = function (user) {

    return new Promise((resolve) => {
        resolve(
          {
            token: jwt.encode(user, config.jwtSecret.secretOrKey)
          }
        );

    });
};
