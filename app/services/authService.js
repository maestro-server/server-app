'use strict';

const tokenTransform = require('./transforms/tokenTransform');
const UserRepository = require('../repositories/usersRepository');

const validToken = require('../repositories/validators/validToken');
const validAccessService = require('./validators/validAccessService');
const validForgotEmail = require('../repositories/validators/validForgotEmail');

const forgotEmailTransform = require('./transforms/forgotEmailTransform');
const decodePassForgot = require('./libs/decodePassForgot');

const mailerService = require('./libs/mailerService');

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
                    return validAccessService(e);
                })
                .then((e) => {
                    return forgotEmailTransform(e, body);
                })
                .then((e) => {
                    return new mailerService()
                        .sender(
                            e.email,
                            "Maestro Server - Recovery Password",
                            "forgot",
                            e);
                })
                .then((e) => {
                    resolve(e);
                })
                .catch((err) => {
                    reject(err);
                });


        });
    }

    static changePassword(body) {

        return new Promise(function (resolve, reject) {

            validToken(body)
                .then((e) => {
                    return decodePassForgot(e);
                })
                .then((e) => {
                    return new UserRepository()
                        .changePass(e, body);
                })
                .then((e) => {
                    return validAccessService(e);
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
