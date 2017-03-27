'use strict';

import UserRepository from '../repositories/usersRepository';

class UsersService {

    static find(query) {

        return new Promise(function(resolve, reject) {

            let limit = parseInt(query.limit) || 20;
            let skip = parseInt(query.skip) || 0;

            let promises = new UserRepository()
                .find(query, limit, skip)
                .then((e) => {
                    resolve(e);
                })
                .catch((err) => {
                    reject(err);
                });

        });

    }

    static findOne(_id) {
      return new Promise(function(resolve, reject) {

          let promises = new UserRepository()
              .findOne({_id})
              .then((e) => {
                  resolve(e);
              })
              .catch((err) => {
                  reject(err);
              });

      });
    }

    static update(_id, user) {

      return new Promise(function(resolve, reject) {

          new UserRepository()
              .update(_id, user)
              .then((e) => {
                  resolve(e);
              })
              .catch((err) => {
                  reject(err);
              });

      });
    }

    static remove(_id) {

      return new Promise(function(resolve, reject) {

          let promises = new UserRepository()
              .remove(_id)
              .then((e) => {
                  resolve(e);
              })
              .catch((err) => {
                  reject(err);
              });

      });
    }

    static create(user) {

        return new Promise(function(resolve, reject) {

            let promises = new UserRepository()
                .create(user)
                .then((e) => {
                    resolve(e);
                })
                .catch((err) => {
                    reject(err);
                });

        });

    }
}

module.exports = UsersService;
