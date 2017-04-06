import jwt from 'jwt-simple';
import config from '../../helpers/auth_forgot_config';

module.exports = function (user, body) {

    return new Promise((resolve, reject) => {

        const  token = jwt.encode(user, config.jwtSecret.secretOrKey);


        let url = body.callback_url;

        if(url.indexOf("?") == -1) {
            url = url+"?";
        }

        url = `${url}token=${token}`;

       resolve(
            Object.assign(user, {url})
        );

    });
};
