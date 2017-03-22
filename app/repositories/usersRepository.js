'use strict';

import UserDao from './daos/user';
import validUsers from './validators/validUser';
import validDuplicate from './validators/validDuplicateUser';
import validFiltersPagination from './validators/validFiltersPagination';

import filled from 'filter-object';

class UsersRepository {

    constructor() {
        this.filled = ['name', 'email', 'password', 'phone', 'company', 'avatar', 'job', 'country', 'city', 'address'];
        this.resFilled = ['_id', 'name', 'email'];
        this.filterFilled = ['city'];

    }

    find(dirty = null, limit = 20, skip = 0) {

        return new Promise((resolve, reject) => {

            let filters = filled(dirty, this.filterFilled);

            validFiltersPagination(filters)
                .then(() => {
                    return UserDao
                        .limit(limit)
                        .skip(skip)
                        .find(filters)
                })
                .then((e) => {
                    resolve(e)
                })
                .catch((err) => {
                    reject(err);
                });

        });

    }

    findOne(dirty = null, limit=20, skip=0) {


    }

    update() {

    }

    delete() {

    }

    createUser(dirty) {

        return new Promise((resolve, reject) => {

            let user = filled(dirty, this.filled);

            validUsers(user)
                .then(() => {
                    return validDuplicate(user.email)
                })
                .then(() => {
                    return new UserDao(user).save()
                })
                .then((e) => {
                    resolve(
                        filled(e.attributes, this.resFilled)
                    )
                })
                .catch((err) => {
                    reject(err);
                });

        });

    }
}

module.exports = UsersRepository;
