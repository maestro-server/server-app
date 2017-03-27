import jwt from 'jwt-simple';
import config from '../../helpers/auth_config';

module.exports = function (user) {

    return new Promise((resolve, reject) => {

        resolve(
            jwt.encode(user, config.jwtSecret)
        );

    });
};
