'use strict';

const _ = require('lodash');
const FactoryDBRepository = require('core/repositories/DBRepository');
const ClosurePromesify = require('core/libs/factoryPromisefy');

const validPassMatch = require('profile/services/validator/validPassMatch');
const tokenTransform = require('profile/transforms/tokenTransform');

const factoryValid = require('core/libs/factoryValid');
const forgotEmailTransform = require('profile/transforms/forgotEmailTransform');
const decodePassForgot = require('./libs/decodePassForgot');

const MailerService = require('core/services/MailerService');
const {ObjectId} = require('mongorito');

const AuthService = (Entity) => {

    const DBRepository = FactoryDBRepository(Entity);

    return {
        authenticate (body) {

            return ClosurePromesify(() => {

                body = _.pick(body, 'email', 'password');
                factoryValid(body, Entity.validators.login);

                const {email} = body;
                const {password} = body;

                return DBRepository
                    .findOne({email})
                    .then((e) => {
                        return validPassMatch(password, e);
                    })
                    .then((e) => {
                        return tokenTransform(e);
                    });
            });
        },

        updateExistPassword (body, owner) {

            return ClosurePromesify(() => {

                body = _.pick(body, 'email', 'password', 'newpass');
                factoryValid(body, Entity.validators.changePass);

                return AuthService(Entity)
                    .authenticate(body)
                    .then(() => {
                        const fill = _.difference(Entity.filled, ['owner', Entity.access]);
                        const data = {'password': _.get(body, 'newpass')};
                        const {_id} = owner;

                        return DBRepository
                            .update({_id}, data, fill);
                    });
            });
        },

        forgot (body) {

            return ClosurePromesify(() => {

                body = _.pick(body, 'email', 'callback_url');
                factoryValid(body, Entity.validators.forgot);

                const {email} = body;

                return DBRepository
                    .findOne({email}, ['_id', 'email'])
                    .then((e) => {
                        return forgotEmailTransform(e, body);
                    })
                    .then((e) => {
                        return MailerService()
                            .sender(
                                e.email,
                                "Maestro Server - Recovery Password",
                                "forgot",
                                e);
                    });
            });

        },

        updateForgotPassword (body) {

            return ClosurePromesify(() => {

                body = _.pick(body, 'password', 'token');
                factoryValid(body, Entity.validators.forgotChange);

                return decodePassForgot(body)
                    .then((e) => {
                        const {password} = body;
                        let {_id} = e;
                        _id = ObjectId(_id);

                        return DBRepository
                            .update({_id}, {password}, ['password']);
                    });
            });

        }
    };

};

module.exports = AuthService;
