'use strict';

import UserDao from './daos/user';
import validNewUser from './validators/validNewUser';
import validUser from './validators/validUser';
import validDuplicate from './validators/validDuplicateUser';
import validFiltersPagination from './validators/validFiltersPagination';

import filled from 'filter-object';

class UsersRepository {

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

    find(dirty = null, limit = 20, skip = 0) {

        return new Promise((resolve, reject) => {

            let filters = filled(dirty, this.filterFilled);

            validFiltersPagination(filters)
                .then(() => {
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

          UserDao.exclude('password')
          .findOne(filter)
              .then((e) => {
                  resolve(e)
              })
              .catch((err) => {
                  reject(err);
              });
      });

    }

    update(filter, dirty) {

      return new Promise((resolve, reject) => {

          let user = filled(dirty, this.filled);

user._id = filter._id;

          validUser(user)
              .then(() => {
                  return new UserDao(user)
                  .update();
              })
              .then((e) => {
                console.log(e)
                  resolve(
                      filled(e.attributes, this.resFilled)
                  )
              })
              .catch((err) => {
                  reject(err);
              });

      });

    }

    delete(filter) {

    }

    create(dirty) {

        return new Promise((resolve, reject) => {

            let user = filled(dirty, this.filled);

            validNewUser(user)
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
