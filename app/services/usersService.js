'use strict';

const UserRepository = require('../repositories/usersRepository');

const singleTransform = require('./transforms/singleTransform');
const collectionTransform = require('./transforms/collectionTransform');

const validNotFound = require('./validators/validNotFound');

class UsersService {

    static find(query) {

        return new Promise(function (resolve, reject) {

            const limit = parseInt(query.limit) || 20;
            const page = parseInt(query.page) || 1;
            const skip = limit * (page - 1);

            Promise.all([
                    new UserRepository().find(query, limit, skip),
                    new UserRepository().count(query)
                ])
                .then((e) => {
                    return validNotFound(e, e[1], limit, page);
                })
                .then((e) => {
                    return collectionTransform(e[0], e[1], 'teams', limit, page);
                })
                .then((e) => {
                    resolve(e);
                })
                .catch((err) => {
                    reject(err);
                });

        });

    }

    static autocomplete(query) {

        return new Promise(function (resolve, reject) {

            let  email;
            if (query.hasOwnProperty('complete')) {
                email = {$regex:query.complete};
            }

            UsersService
                .find({email})
                .then((e) => {
                    resolve(e);
                })
                .catch((err) => {
                    reject(err);
                });

        });
    }

    static findOne(_id) {
        return new Promise(function (resolve, reject) {

            new UserRepository([])
                .findOne({_id})
                .then((e) => {
                    resolve(e);
                })
                .catch((err) => {
                    reject(err);
                });

        });
    }

    static publicFindOne(_id) {
        return new Promise(function (resolve, reject) {

            new UserRepository()
                .findOne({_id})
                .then((e) => {
                    return validNotFound(e);
                })
                .then((e) => {
                    resolve(e);
                })
                .catch((err) => {
                    reject(err);
                });

        });
    }

    static update(_id, user) {

        return new Promise(function (resolve, reject) {

            new UserRepository()
                .update({_id}, user)
                .then((e) => {
                    resolve(e);
                })
                .catch((err) => {
                    reject(err);
                });

        });
    }

    static remove(_id) {

        return new Promise(function (resolve, reject) {

            new UserRepository()
                .remove(_id)
                .then((e) => {
                    resolve(e);
                })
                .catch((err) => {
                    reject(err);
                });

        });
    }

    static create(user) {

        return new Promise(function (resolve, reject) {

            new UserRepository()
                .create(user)
                .then((e) => {
                    return singleTransform(e, 'users');
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

module.exports = UsersService;
