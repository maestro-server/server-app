'use strict';

import UserRepository from '../repositories/usersRepository';
import Promises from 'bluebird';

class UsersService {

    static find(query) {

        return new Promise(function(resolve, reject) {

            let limit = parseInt(query.limit) || 20;
            let skip = parseInt(query.skip) || 0;

            let promises = new UserRepository()
                .find(query, limit, skip)
                .then((result) => {
                    resolve(result);
                })
                .catch((err) => {
                    reject(err);
                });

        });

    }

    static findOne(id) {

    }

    static update(id, user) {

    }

    static delete(id) {

    }

    static create(user) {

        return new Promise(function(resolve, reject) {

            let promises = new UserRepository()
                .createUser(user)
                .then((users) => {
                    resolve(users);
                })
                .catch((err) => {
                    reject(err);
                });

        });

    }
}

module.exports = UsersService;
