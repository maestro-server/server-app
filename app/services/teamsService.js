'use strict';

import TeamRepository from '../repositories/teamsRepository';
import TeamMembersRepository from '../repositories/teamMembersRepository';

import merger from '../repositories/transforms/mergeTransform';
import collectionTransform from './transforms/collectionTransform';
import collectionRefsTransform from './transforms/collectionRefsTransform';

import validNotFound from './validators/validNotFound';

class TeamsService {

    static find(query, owner) {

        return new Promise(function(resolve, reject) {

            const limit = parseInt(query.limit) || 20;
            const page = parseInt(query.page) || 1;
            const skip = limit * (page-1);


            merger(query, {"owner._id": owner._id})
                .then((e) => {
                  return Promise.all([
                    new TeamRepository().find(e, limit, skip),
                    new TeamRepository().count(e)
                  ]);
                })
                .then((e) => {
                    return validNotFound(e, limit, page);
                })
                .then((e) => {
                  return collectionTransform(e, limit, page, 'teams');
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
                  return collectionRefsTransform(e.get('members'), _id, 'teams', e);
              })
              .then((e) => {
                  resolve(e);
              })
              .catch((err) => {
                  reject(err);
              });

      });
    }

    static update(_id, team, owner) {

      return new Promise(function(resolve, reject) {

          merger(team, {owner})
              .then((e) => {
                  return new TeamRepository()
                      .update(_id, e)
              })
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

    static getMembers(_id, user) {

        return new Promise(function(resolve, reject) {

            new TeamRepository()
                .findOne({_id})
                .then((e) => {
                    return collectionRefsTransform(e.get('members'), _id, 'teams');
                })
                .then((e) => {
                    resolve(e);
                })
                .catch((err) => {
                    reject(err);
                });

        });
    }

    static addMember(_id, member, user) {

        return new Promise(function(resolve, reject) {

            new TeamMembersRepository()
                .add(_id, member)
                .then((e) => {
                    return collectionRefsTransform([e.get('members')], _id, 'teams');
                })
                .then((e) => {
                    resolve(e);
                })
                .catch((err) => {
                    reject(err);
                });

        });

    }

    static deleteMember(_id, _idu, user) {
        return new Promise(function(resolve, reject) {

            new TeamMembersRepository()
                .remove(_id, _idu)
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
