'use strict';

const jwt = require('jwt-simple');
const config = require('../../helpers/auth_forgot_config');

const Crypto = require('../../repositories/crypto/crypto');

module.exports = function (user, body) {

    return new Promise((resolve) => {

        const crypt = Crypto.encrypt(
            JSON.stringify(user)
        );

        const  token = jwt.encode(crypt, config.jwtSecret.secretOrKey);


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
