'use strict';

const jwt = require('jwt-simple');
const config = require('profile/config/auth_forgot_config');

const Crypto = require('core/libs/crypto');

const ConflictError = require('core/errors/factoryError')('ConflictError');

module.exports = function (crypto) {

    return new Promise((resolve, reject) => {

        let result, decoded;

        try {
            decoded = jwt.decode(crypto.token, config.jwtSecret.secretOrKey);
        } catch (err) {
            throw new ConflictError(err);
        }

        const string = Crypto.decrypt(decoded);

        try {
            result = JSON.parse(string);
        } catch(err) {
            reject(err);
        }

        resolve(result);

    });
};
