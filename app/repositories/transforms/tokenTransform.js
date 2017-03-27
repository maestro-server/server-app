import jwt from 'jwt-simple';
import config from '../../helpers/auth_config';

module.exports = function (user) {

    return new Promise((resolve, reject) => {
        resolve(
          {
            token: jwt.encode(user, config.jwtSecret.secretOrKey)
          }
        );

    });
};
