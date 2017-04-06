import jwt from 'jwt-simple';
import config from '../../helpers/auth_forgot_config';

import ConflictError from '../../errors/conflictError';

module.exports = function (crypto) {

    return new Promise((resolve, reject) => {

        const decoded = jwt.decode(crypto.token, config.jwtSecret.secretOrKey);

        if (!decoded)
            throw new ConflictError("Invalid token");

        resolve(decoded);


    });
};
