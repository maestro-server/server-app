'use strict';

const _ = require('lodash');
const TeamRepository = require('../repositories/teamsRepository');
const uploaderService = require('./libs/uploaderService');

const RolesService = require('./libs/rolesService');
const TeamDAO = require('../repositories/daos/team');

const merger = require('../repositories/transforms/mergeTransform');
const refsTransform = require('./transforms/refsTransform');
const singleTransform = require('./transforms/singleTransform');
const collectionTransform = require('./transforms/collectionTransform');
const accessMergeTransform = require('./transforms/accessMergeTransform');
const filledTransform = require('../repositories/transforms/filledTransform');

const validNotFound = require('./validators/validNotFound');

const Access = require('../entities/accessRole');

class TeamsService {

    static find(query, owner, access=Access.ROLE_READ) {

        return new Promise(function (resolve, reject) {

            const limit = parseInt(query.limit) || 20;
            const page = parseInt(query.page) || 1;
            const skip = limit * (page - 1);

            accessMergeTransform(owner, "members", query, access)
                .then((e) => {
                    return Promise.all([
                        new TeamRepository().find(e, limit, skip),
                        new TeamRepository().count(e)
                    ]);
                })
                .then((e) => {
                    return validNotFound(e, e[1], limit, page);
                })
                .then((e) => {
                    return collectionTransform(e[0], e[1], 'teams', limit, page);
                })
                .then((e) => {
                    resolve(e);
                })
                .catch((err) => {
                    reject(err);
                });


        });

    }

    static autocomplete(query, owner) {

        return new Promise(function (resolve, reject) {

            let  name;
            if (query.hasOwnProperty('complete')) {
                name = {$regex:query.complete, '$options' : 'i'};
            }

            TeamsService
                .find({name}, owner)
                .then((e) => {
                    resolve(e);
                })
                .catch((err) => {
                    reject(err);
                });

        });
    }

    static findOne(_id, owner, access=Access.ROLE_READ) {
        return new Promise(function (resolve, reject) {

            accessMergeTransform(owner, "members", {_id}, access)
                .then((e) => {
                    return new TeamRepository()
                        .findOne(e);
                })
                .then((e) => {
                    return refsTransform(e, 'members');
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

        return new Promise(function (resolve, reject) {

            accessMergeTransform(owner, "members", {_id}, Access.ROLE_ADMIN)
                .then((e) => {
                    return new TeamRepository()
                        .update(e, team);
                })
                .then((e) => {
                    resolve(e);
                })
                .catch((err) => {
                    reject(err);
                });

        });
    }

    static remove(_id, owner) {

        return new Promise(function (resolve, reject) {

            accessMergeTransform(owner, "members", {_id}, Access.ROLE_ADMIN)
                .then((e) => {
                    return new TeamRepository()
                        .remove(e);
                })
                .then((e) => {
                    resolve(e);
                })
                .catch((err) => {
                    reject(err);
                });

        });
    }

    static create(team, user) {

        return new Promise(function (resolve, reject) {

          filledTransform(user, ['_id', 'name', 'email'])
                .then((owner) => {
                  return merger(team, {owner});
                })
                .then((e) => {
                    return new TeamRepository()
                        .create(e);
                })
                .then((e) => {
                    return refsTransform(e, 'members');
                })
                .then((e) => {
                    return singleTransform(e, 'teams');
                })
                .then((e) => {
                    resolve(e);
                })
                .catch((err) => {
                    reject(err);
                });

        });

    }

    static addMember(_id, member, owner) {

        return new RolesService(TeamDAO)
            .addRoles(_id, member, owner);
    }

    static updateMember(_id, _idu, member, owner) {

        return new RolesService(TeamDAO)
            .updateRoles(_id, _idu, member, owner);
    }

    static deleteMember(_id, _idu, owner) {

        return new RolesService(TeamDAO)
            .deleteRoles(_id, _idu, owner);
    }

    static uploadAvatar(query, owner) {

        return new Promise(function (resolve, reject) {
            new uploaderService("teams")
                .uploadImage(owner._id, query.filetype)
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
