'use strict';

import tokenTransform from './transforms/tokenTransform';
import UserRepository from '../repositories/usersRepository';

import validToken from '../repositories/validators/validToken';
import validNotFound from './validators/validNotFound';
import validForgotEmail from '../repositories/validators/validForgotEmail';

import forgotEmailTransform from './transforms/forgotEmailTransform';
import decodePassForgot from './libs/decodePassForgot';

import mailerService from './libs/mailerService';

class AuthService {

    static authenticate(body) {

        return new Promise(function (resolve, reject) {

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

    static forgot(body) {

        return new Promise(function (resolve, reject) {

            validForgotEmail(body)
                .then((e) => {
                    const {email} = e;

                    return new UserRepository(['_id', 'email'])
                        .findOne({email});
                })
                .then((e) => {
                    if (!e)
                        reject();

                    return forgotEmailTransform(e, body);
                })
                .then((e) => {
                    return new mailerService()
                        .sender(
                            e.email,
                            "Maestro Server - Recovery Password",
                            "forgot",
                            e)
                })
                .then((e) => {
                    resolve(e);
                })
                .catch((err) => {
                    reject(err);
                });


        });
    }

    static changePassword(body, header) {

        return new Promise(function (resolve, reject) {

            validToken(body)
                .then((e) => {
                    return decodePassForgot(e);
                })
                .then((e) => {
                    return new UserRepository(['_id', 'email'])
                        .findOne(e);
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
