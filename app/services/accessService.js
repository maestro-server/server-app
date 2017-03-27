'use strict';

import AccessRepository from '../repositories/accessRepository';

class AccessService {

    static find(query) {

        return new Promise(function(resolve, reject) {

            let limit = parseInt(query.limit) || 20;
            let skip = parseInt(query.skip) || 0;

            let promises = new AccessRepository()
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

          let promises = new AccessRepository()
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

          new AccessRepository()
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

          let promises = new AccessRepository()
              .remove(_id)
              .then((e) => {
                  resolve(e);
              })
              .catch((err) => {
                  reject(err);
              });

      });
    }

    static create(access) {

        return new Promise(function(resolve, reject) {

            let promises = new AccessRepository()
                .create(access)
                .then((e) => {
                    resolve(e);
                })
                .catch((err) => {
                    reject(err);
                });

        });

    }
}

module.exports = AccessService;
