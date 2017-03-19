'use strict';

import UserDao from './daos/user';
import validator from 'validator';

class UsersRepository {

    constructor() {}

    getUser(id) {

    }

    getUsers(limit = 20, filters = null) {

    }

    createUser(user) {

        let promises = new Promise(function(resolve, reject) {

            let promises = new UserDao(user)
                .save()
                .then(function(users){
                    resolve(users);
                })
                .catch(function(err) {
                    reject(err);
                });

        });

        return promises;
    }
}

module.exports = UsersRepository;
