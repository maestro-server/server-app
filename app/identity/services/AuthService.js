'use strict';

const _ = require('lodash');
const FactoryDBRepository = require('core/repositories/DBRepository');

const validPassMatch = require('identity/services/validator/validPassMatch');
const tokenTransform = require('identity/transforms/tokenTransform');

const accessEmpty = require('core/applications/validator/validAccessEmpty');

const factoryValid = require('core/libs/factoryValid');
const forgotEmailTransform = require('identity/transforms/forgotEmailTransform');
const decodePassForgot = require('./libs/decodePassForgot');

const MailerService = require('core/services/MailerService');
const in_maker = require('core/libs/in_maker');

const AuthService = (Entity) => {

    const DBRepository = FactoryDBRepository(Entity);

    return {
        authenticate (body) {

            return new Promise((resolve, reject) => {

                body = _.pick(body, 'email', 'password');
                factoryValid(body, Entity.validators.login);

                const {email} = body;
                const {password} = body;

                return DBRepository
                    .findOne({email})
                    .then(validPassMatch(password))
                    .then(e=> {
                        let data = _.pick(e, '_id', 'name', 'email', 'avatar');
                        return Object.assign(data, {'sub': data['_id']}); // create sub item, used on websocket auth
                    })
                    .then(tokenTransform)
                    .then(resolve)
                    .catch(reject);
            });
        },

        updateExistPassword (body, owner) {

            return new Promise((resolve, reject) => {

                body = _.pick(body, 'email', 'password', 'newpass');
                factoryValid(body, Entity.validators.changePass);

                return AuthService(Entity)
                    .authenticate(body)
                    .then(() => {
                        const fill = _.difference(Entity.filled, ['owner', Entity.access]);
                        const data = {'password': _.get(body, 'newpass')};
                        const {_id} = owner;

                        return DBRepository
                            .patch({_id}, data, fill);
                    })
                    .then(resolve)
                    .catch(reject);
            });
        },

        forgot (body) {

            return new Promise((resolve, reject) => {

                body = _.pick(body, 'email', 'callback_url');
                factoryValid(body, Entity.validators.forgot);

                const {email} = body;

                return DBRepository
                    .findOne({email}, ['_id', 'email'])
                    .then(accessEmpty)
                    .then((e) => {
                        return forgotEmailTransform(e, body);
                    })
                    .then((e) => {
                        return MailerService()
                            .sender(e.email, "Maestro Server - Recovery Password","forgot",e);
                    })
                    .then(resolve)
                    .catch(reject);
            });

        },

        updateForgotPassword (body) {

            return new Promise((resolve, reject) => {

                body = _.pick(body, 'password', 'token');
                factoryValid(body, Entity.validators.forgotChange);

                return decodePassForgot(body)
                    .then((e) => {

                        const {password} = body;
                        const _id = in_maker(e._id);

                        return DBRepository
                            .patch({_id}, {password}, ['password']);
                    })
                    .then(resolve)
                    .catch(reject);
            });

        }
    };

};

module.exports = AuthService;
