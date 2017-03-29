'use strict';

import TeamRepository from '../repositories/teamsRepository';

import merger from '../repositories/transforms/mergeTransform';
import collectionTransform from './transforms/collectionTransform';

class TeamsService {

    static find(query, owner) {

        return new Promise(function(resolve, reject) {

            let limit = parseInt(query.limit) || 20;
            let skip = parseInt(query.skip) || 0;

            merger(query, {"owner._id": owner._id})
                .then((e) => {
                  return Promise.all([
                    new TeamRepository().find(e, limit, skip),
                    new TeamRepository().count(e)
                  ]);
                })
                .then((e) => {
                  return collectionTransform(e, limit, skip);
                })
                .then((e) => {
                    resolve(e);
                })
                .catch((err) => {
                    reject(err);
                });

            merger(query, {"owner._id": owner._id})
                .then((e) => {
                    return new TeamRepository()
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

    static findOne(_id) {
      return new Promise(function(resolve, reject) {

          new TeamRepository()
              .findOne({_id})
              .then((e) => {
                  resolve(e);
              })
              .catch((err) => {
                  reject(err);
              });

      });
    }

    static update(_id, team) {

      return new Promise(function(resolve, reject) {

          new TeamRepository()
              .update(_id, team)
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

          let promises = new TeamRepository()
              .remove(_id)
              .then((e) => {
                  resolve(e);
              })
              .catch((err) => {
                  reject(err);
              });

      });
    }

    static create(team, owner) {

        return new Promise(function(resolve, reject) {

            merger(team, {owner})
                .then((e) => {
                    return new TeamRepository()
                        .create(e)
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

module.exports = TeamsService;
