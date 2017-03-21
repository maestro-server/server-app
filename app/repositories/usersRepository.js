'use strict';

import UserDao from './daos/user';
import validUsers from './validators/validUser';
import validDuplicate from './validators/validDuplicateUser';

import filled from 'filter-object';

class UsersRepository {

    constructor() {
        this.filled = ['name', 'email', 'password', 'phone', 'company', 'avatar', 'job', 'country', 'city', 'address'];
        this.resFilled = ['_id', 'name', 'email'];
    }

    getUser(id) {

    }

    getUsers(limit = 20, filters = null) {

    }

    createUser(dirty) {


        let promises = new Promise((resolve, reject) => {

            let user = filled(dirty, this.filled);

            validUsers(user)
                //.then(() => {
                //  return validDuplicate(user.email)
                //})
                .then(() => {
                    return new UserDao(user).
                    save()
                }).then((e) => {
                    resolve(
                      filled(e.attributes, this.resFilled)
                    );
                })
                .catch((err) => {
                    reject(err);
                });

        });

        return promises;
    }
}

module.exports = UsersRepository;
