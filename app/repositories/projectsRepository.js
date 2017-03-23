'use strict';

import UserDao from './daos/user';
import validUsers from './validators/validUser';
import validDuplicate from './validators/validDuplicateUser';

import filled from 'filter-object';

class ProjectsRepository {


    /**
     *
     * filled = fields usgin to create a new entiti
     * resFilled = fields with show to result
     * filterFilled = fields using to filters find
     */
    constructor() {
        this.filled = ['name', 'email', 'password', 'phone', 'company', 'avatar', 'job', 'country', 'city', 'address'];
        this.resFilled = ['_id', 'name', 'email'];
        this.filterFilled = ['city'];
    }

    find(filters = {}, limit = 20, skip = 0) {

        return new Promise((resolve, reject) => {

            activeTransform.active(filters)
                .then((filters) => {
                    return UserDao
                        .limit(limit)
                        .skip(skip)
                        .sort('created_at', -1)
                        .include(this.resFilled)
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

    findOne(filter) {

        return new Promise((resolve, reject) => {

            activeTransform.active(filter)
                .then((filter) => {
                    return UserDao
                        .exclude('password')
                        .findOne(filter)
                })
                .then((e) => {
                    resolve(e)
                })
                .catch((err) => {
                    reject(err);
                });

        });

    }

    update(id, user) {

        return new Promise((resolve, reject) => {

            filledTransform(user, this.filled)
                .then((e) => {
                    return validUser(e)
                })
                .then((e) => {
                    return validDuplicate(e);
                })
                .then((e) => {
                    return new UserDao(e)
                        .updateById(id);
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

    remove(_id) {

        return new Promise((resolve, reject) => {

            activeTransform.desactive({})
                .then((user) => {
                    return new UserDao(user)
                        .updateById(_id);
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

    create(user) {

        return new Promise((resolve, reject) => {

            filledTransform(user, this.filled)
                .then((e) => {
                    return validNewUser(e);
                })
                .then((e) => {
                    return validDuplicate(e);
                })
                .then((e) => {
                    return activeTransform.active(e);
                })
                .then((e) => {
                    return new UserDao(e).save()
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

module.exports = ProjectsRepository;
