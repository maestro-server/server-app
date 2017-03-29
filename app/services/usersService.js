'use strict';

import UserRepository from '../repositories/usersRepository';

class UsersService {

    static find(query) {

        return new Promise(function(resolve, reject) {

            const limit = parseInt(query.limit) || 20;
            const skip = parseInt(query.skip) || 0;
            const filters = query.filters || {};

            new UserRepository()
                .find(filters, limit, skip)
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

          new UserRepository()
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

          new UserRepository()
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

            new UserRepository()
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
