'use strict';

const Repository = require('./Repository');

const UserDao = require('./daos/user');
const validUser = require('./validators/validUser');
const validNewUser = require('./validators/validNewUser');
const validAccessUpdater = require('./validators/validAccessUpdater');

const validAuth = require('./validators/validAuth');
const validDuplicate = require('./validators/validDuplicateUser');
const validPassMatch = require('./validators/validPassMatch');

const filledTransform = require('./transforms/filledTransform');
const activeTransform = require('./transforms/activeTransform');
const clearDaoTransform = require('./transforms/clearDaoTransform');
const formatObjectId = require('./format/formatObjectId');


const {ObjectId} = require('mongorito');

class UsersRepository extends Repository {

    /**
     *
     * filled = fields usgin to create a new entiti
     * resFilled = fields with show to result
     */
    constructor(resFilled = null, filled = null) {
        super();
        this.setFilled(filled || ['name', 'fullname', 'email', 'password', 'phone', 'company', 'avatar', 'job', 'country', 'city', 'address']);
        this.setResFilled(resFilled || ['_id', 'name', 'email', 'avatar']);
    }


    find(filters = {}, limit = 20, skip = 0) {

        return new Promise((resolve, reject) => {

            filledTransform(filters, this.filled)
                .then((e) => {
                    return activeTransform.active(e);
                })
                .then((e) => {
                    return UserDao
                        .limit(limit)
                        .skip(skip)
                        .sort('created_at', -1)
                        .include(this.resFilled)
                        .find(e);
                })
                .then((e) => {
                    return clearDaoTransform(e);
                })
                .then((e) => {
                    resolve(e);
                })
                .catch((err) => {
                    reject(err);
                });

        });

    }

    count(filters = {}) {

        return new Promise((resolve, reject) => {

            filledTransform(filters, this.filled)
                .then((e) => {
                    return activeTransform.active(e);
                })
                .then((e) => {
                    return UserDao
                        .count(e);
                })
                .then((e) => {
                    resolve(e);
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
                .then(() => {
                    return UserDao
                        .findOne({email});
                })
                .then((e) => {
                    return validPassMatch(password, e);
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
                .then((e) => {
                    return UserDao
                        .exclude(['password', 'created_at', 'updated_at'])
                        .findOne(e);
                })
                .then((e) => {
                    if (e)
                        e = e.get();

                    resolve(e);
                })
                .catch((err) => {
                    reject(err);
                });

        });

    }

    update(id, user) {

        return new Promise((resolve, reject) => {

            this.excludeFilled('password');

            filledTransform(user, this.filled)
                .then((e) => {
                    return validUser(e);
                })
                .then((e) => {
                  return e.email ? validDuplicate(e) : e;
                })
                .then((e) => {
                    return new UserDao(e)
                        .updateAndModify(id);
                })
                .then((e) => {
                    return validAccessUpdater(e);
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

    remove(_id) {

        return new Promise((resolve, reject) => {


            _id = ObjectId(_id);


            activeTransform.desactive({})
                .then((e) => {
                    return new UserDao(e)
                        .updateAndModify({_id});
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
                    return new UserDao(e).save();
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


    changePass(_id, user) {

        return new Promise((resolve, reject) => {

            this.setFilled(['password']);

            filledTransform(user, this.filled)
                .then((e) => {
                    return new UserDao(e)
                        .updateAndModify({_id});
                })
                .then((e) => {
                    return validAccessUpdater(e);
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
}

module.exports = UsersRepository;
