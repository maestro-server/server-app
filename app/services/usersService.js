'use strict';

import UserRepository from '../repositories/usersRepository';
import Promises from 'bluebird';

class UsersService {

    static find(query) {

        return new Promise(function(resolve, reject) {

            let limit = parseInt(query.limit) || 20;
            let skip = parseInt(query.skip) || 0;

            let promises = new UserRepository()
                .find(query, limit, skip)
                .then((result) => {
                    resolve(result);
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
              .then((result) => {
                  resolve(result);
              })
              .catch((err) => {
                  reject(err);
              });

      });
    }

    static update(_id, user) {

      return new Promise(function(resolve, reject) {

          let promises = new UserRepository()
              .update({_id}, user)
              .then((users) => {
                  resolve(users);
              })
              .catch((err) => {
                  reject(err);
              });

      });
    }

    static delete(_id) {

      return new Promise(function(resolve, reject) {

          let promises = new UserRepository()
              .delete({_id})
              .then((result) => {
                  resolve(result);
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
                .then((users) => {
                    resolve(users);
                })
                .catch((err) => {
                    reject(err);
                });

        });

    }
}

module.exports = UsersService;
