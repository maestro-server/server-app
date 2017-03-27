'use strict';

import tokenTransform from '../repositories/transforms/tokenTransform';
import UserRepository from '../repositories/usersRepository';
import config from '../helpers/auth_config';
import jwt from "jwt-simple";


class AuthService {

    static authenticate(body) {

        return new Promise(function(resolve, reject) {

            new UserRepository()
                .authenticate(body)
                .then((e) => {
                    return tokenTransform(e);
                })
                .then((e) => {
                    resolve(e);
                })
                .catch((err) => {
                    reject(err);
                });

        });

    }
}

module.exports = AuthService;
