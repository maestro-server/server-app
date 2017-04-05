'use strict';

import tokenTransform from './transforms/tokenTransform';
import UserRepository from '../repositories/usersRepository';

import mailerService from './libs/mailerService';

class AuthService {

    static authenticate (body) {

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

    static forgot (body) {

        return new Promise(function(resolve, reject) {

            new mailerService()
                .sender("felipeklerk@yahoo.com.br", "teste sender", "ola mundo")
                .then((e) => {

                    console.log(e);
                    resolve(e);
                })
                .catch((err) => {
                    reject(err);
                });



            resolve();
        });
    }

    static changePassword (body, header) {

    }
}

module.exports = AuthService;
