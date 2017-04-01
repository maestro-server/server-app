'use strict';

import TeamRepository from '../repositories/teamsRepository';
import TeamMembersRepository from '../repositories/teamMembersRepository';

import merger from '../repositories/transforms/mergeTransform';
import refsTransform from './transforms/refsTransform';
import singleTransform from './transforms/singleTransform';
import collectionTransform from './transforms/collectionTransform';
import accessMergeTransform from './transforms/accessMergeTransform';
import collectionRefsTransform from './transforms/collectionRefsTransform';

import validNotFound from './validators/validNotFound';

import Access from '../entities/accessRole';

class TeamsService {

    static find(query, owner) {

        return new Promise(function (resolve, reject) {

            const limit = parseInt(query.limit) || 20;
            const page = parseInt(query.page) || 1;
            const skip = limit * (page - 1);

            accessMergeTransform(owner, "members", query)
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

    static findOne(_id, owner) {
        return new Promise(function (resolve, reject) {

            accessMergeTransform(owner, "members", {_id})
                .then((e) => {
                    return new TeamRepository()
                        .findOne(e)
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

            accessMergeTransform(owner, "members", {_id}, Access.ROLE_WRITER)
                .then((e) => {
                    return new TeamRepository()
                        .update(e, team)
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

    static remove(_id, owner) {

        return new Promise(function (resolve, reject) {

            accessMergeTransform(owner, "members", {_id}, Access.ROLE_ADMIN)
                .then((e) => {
                    return new TeamRepository()
                        .remove(e)
                })
                .then((e) => {
                    resolve(e);
                })
                .catch((err) => {
                    reject(err);
                });

        });
    }

    static create(team, owner) {

        return new Promise(function (resolve, reject) {

            merger(team, {owner})
                .then((e) => {
                    return new TeamRepository()
                        .create(e)
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

    static getMembers(_id, owner) {

        return new Promise(function (resolve, reject) {

            accessMergeTransform(owner, "members", {_id}, Access.ROLE_READ)
                .then((e) => {
                    return new TeamRepository()
                        .findOne(e);
                })
                .then((e) => {
                    if (!e)
                        reject();

                    return collectionRefsTransform(e.members, _id, 'teams');
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

        return new Promise(function (resolve, reject) {

            accessMergeTransform(owner, "members", {_id}, Access.ROLE_ADMIN)
                .then((e) => {
                    return new TeamMembersRepository()
                        .add(e, member);
                })
                .then((e) => {
                    return collectionRefsTransform([e], _id, 'teams');
                })
                .then((e) => {
                    resolve(e);
                })
                .catch((err) => {
                    reject(err);
                });

        });

    }

    static deleteMember(_id, _idu, owner) {
        return new Promise(function (resolve, reject) {

            accessMergeTransform(owner, "members", {_id}, Access.ROLE_ADMIN)
                .then((e) => {
                    return new TeamMembersRepository()
                        .remove(e, _idu);
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
