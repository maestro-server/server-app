'use strict';

import UserDao from './daos/user';
import validUsers from './validators/validUser';
import filled from 'filter-object';

class UsersRepository {

    constructor() {
        this.filled = ['name', 'email', 'password', 'phone', 'company', 'avatar', 'job', 'country', 'city', 'address'];
    }

    getUser(id) {

    }

    getUsers(limit = 20, filters = null) {

    }

    createUser(dirty) {

        let promises = new Promise((resolve, reject) => {

            let user = filled(dirty, this.filled);

            validUsers(user)
                .then(
                    new UserDao(user).
                    save()
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
