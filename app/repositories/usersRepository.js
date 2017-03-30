'use strict';

import UserDao from './daos/user';
import validUser from './validators/validUser';
import validNewUser from './validators/validNewUser';

import validAuth from './validators/validAuth';
import validDuplicate from './validators/validDuplicateUser';
import validPassMatch from './validators/validPassMatch';

import filledTransform from './transforms/filledTransform';
import activeTransform from './transforms/activeTransform';

class UsersRepository {

    /**
     *
     * filled = fields usgin to create a new entiti
     * resFilled = fields with show to result
     */
    constructor(resFilled=null, filled=null) {
        this.setFilled(filled || ['name', 'email', 'password', 'phone', 'company', 'avatar', 'job', 'country', 'city', 'address']);
        this.setResFilled(resFilled || ['_id', 'name', 'email']);
    }

    setFilled (val) {
      this.filled = val;
    }

    setResFilled (val) {
      this.resFilled = val;
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

    authenticate(body) {

        return new Promise((resolve, reject) => {

            let {email} = body;
            let {password} = body;

            validAuth(body)
                .then((e) => {
                    return UserDao
                    .findOne({email})
                })
                .then((e) => {
                    return validPassMatch(password, e)
                })
                .then((e) => {
                    return filledTransform(e.get(), this.resFilled);
                })
                .then((e) => {
                    resolve(e);
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
              .include(this.resFilled)
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
                      .updateAndModify(id);
              })
              .then((e) => {
                  return filledTransform(e.get(), this.resFilled);
              })
              .then((e) => {
                  resolve(e)
              })
              .catch((err) => {
                  reject(err);
              });

      });

    }

    remove(_id) {

      return new Promise((resolve, reject) => {

          activeTransform.desactive({})
              .then((e) => {
                  return new UserDao(e)
                  .updateAndModify(_id);
              })
              .then((e) => {
                  return filledTransform(e.get(), this.resFilled);
              })
              .then((e) => {
                  resolve(e)
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
                    return filledTransform(e.get(), this.resFilled);
                })
                .then((e) => {
                    resolve(e)
                })
                .catch((err) => {
                    reject(err);
                });

        });

    }
}

module.exports = UsersRepository;
