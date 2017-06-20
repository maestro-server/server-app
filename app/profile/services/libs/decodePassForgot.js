'use strict';

const jwt = require('jwt-simple');
const config = require('profile/config/auth_forgot_config');

const Crypto = require('core/libs/crypto');

const ConflictError = require('core/errors/conflictError');

module.exports = function (crypto) {

    return new Promise((resolve, reject) => {

        let result;

        const decoded = jwt.decode(crypto.token, config.jwtSecret.secretOrKey);

        if (!decoded)
            throw new ConflictError("Invalid token");

        const string = Crypto.decrypt(decoded);


        try {
            result = JSON.parse(string);
        } catch(err) {
            reject(err);
        }

        resolve(result);

    });
};
