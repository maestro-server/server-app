import jwt from 'jwt-simple';
import config from '../../helpers/auth_forgot_config';

import Crypto from '../../repositories/crypto/crypto';

import ConflictError from '../../errors/conflictError';

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
