'use strict';

import UserDao from './daos/user';
import validUser from './validators/validUser';
import validNewUser from './validators/validNewUser';

import validDuplicate from './validators/validDuplicateUser';
import validFiltersPagination from './validators/validFiltersPagination';

import filled from 'filter-object';
import activeTransform from './transforms/activeTransform'

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

    update(id, dirty) {

      return new Promise((resolve, reject) => {

          let user = filled(dirty, this.filled);

          validUser(objs)
              .then((user) => {
                  return new UserDao(user)
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

    create(dirty) {

        return new Promise((resolve, reject) => {

            let user = filled(dirty, this.filled);

            validNewUser(user)
                .then(() => {
                    return validDuplicate(user.email);
                })
                .then(() => {
                    return activeTransform.active(user);
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

module.exports = UsersRepository;
