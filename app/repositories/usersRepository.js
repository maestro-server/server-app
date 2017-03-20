'use strict';

import UserDao from './daos/user';
import validUsers from './validators/validUser';

class UsersRepository {

    constructor() {}

    getUser(id) {

    }

    getUsers(limit = 20, filters = null) {

    }

    createUser(user) {

        let promises = new Promise(function(resolve, reject) {

            validUsers(user)
                .then(
                    new UserDao(user)
                        .save()
                ).then(function() {
                    resolve(user);
                })
                .catch(function(err) {
                    reject(err);
                });

        });

        return promises;
    }
}

module.exports = UsersRepository;
