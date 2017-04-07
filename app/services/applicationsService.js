'use strict';

const TeamRepository = require('../repositories/teamsRepository');
const ApplicationsRepository = require('../repositories/applicationsRepository');

const merger = require('../repositories/transforms/mergeTransform');
const refsTransform = require('./transforms/refsTransform');
const singleTransform = require('./transforms/singleTransform');
const collectionTransform = require('./transforms/collectionTransform');
const accessMergeTransform = require('./transforms/accessMergeTransform');
const collectionRefsTransform = require('./transforms/collectionRefsTransform');

const validAccessService = require('./validators/validAccessService');
const validNotFound = require('./validators/validNotFound');
const formatFactoryRefs = require('./helpers/formatFactoryRefs');

const Access = require('../entities/accessRole');

class ApplicationsService {

    static find(query, owner, access=Access.ROLE_READ) {

        return new Promise(function (resolve, reject) {

            const limit = parseInt(query.limit) || 20;
            const page = parseInt(query.page) || 1;
            const skip = limit * (page - 1);

            accessMergeTransform(owner, "roles", query, access)
                .then((e) => {
                    return Promise.all([
                        new ApplicationsRepository().find(e, limit, skip),
                        new ApplicationsRepository().count(e)
                    ]);
                })
                .then((e) => {
                    return validNotFound(e, e[1], limit, page);
                })
                .then((e) => {
                    return collectionTransform(e[0], e[1], 'applications', limit, page);
                })
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

            accessMergeTransform(owner, "roles", {_id}, access)
                .then((e) => {
                    return new ApplicationsRepository()
                        .findOne(e)
                })
                .then((e) => {
                    return refsTransform(e, 'roles');
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

            accessMergeTransform(owner, "roles", {_id}, Access.ROLE_WRITER)
                .then((e) => {
                    return new ApplicationsRepository()
                        .update(e, team)
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

            accessMergeTransform(owner, "roles", {_id}, Access.ROLE_ADMIN)
                .then((e) => {
                    return new ApplicationsRepository()
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

    static create(app, owner) {

        return new Promise(function (resolve, reject) {

            merger(app, {owner})
                .then((e) => {
                    return new ApplicationsRepository()
                        .create(e)
                })
                .then((e) => {
                    return refsTransform(e, 'roles');
                })
                .then((e) => {
                    return singleTransform(e, 'applications');
                })
                .then((e) => {
                    resolve(e);
                })
                .catch((err) => {
                    reject(err);
                });

        });

    }


    static findTeamApplication(_id, query, owner) {

        return new Promise(function (resolve, reject) {

            const limit = parseInt(query.limit) || 20;
            const page = parseInt(query.page) || 1;
            const skip = limit * (page - 1);

            accessMergeTransform(owner, "members", {_id}, Access.ROLE_WRITER)
                .then((e) => {
                    return new TeamRepository()
                        .findOne(e)
                })
                .then((e) => {
                    return validAccessService(e);
                })
                .then((e) => {
                    return ApplicationsService.find(query, e)
                })
                .then((e) => {
                    resolve(e);
                })
                .catch((err) => {
                    reject(err);
                });

        });
    }

    static findOneTeamApplication(_id, _idu, query, owner) {

        return new Promise(function (resolve, reject) {

            const limit = parseInt(query.limit) || 20;
            const page = parseInt(query.page) || 1;
            const skip = limit * (page - 1);

            accessMergeTransform(owner, "members", {_id}, Access.ROLE_WRITER)
                .then((e) => {
                    return new TeamRepository()
                        .findOne(e)
                })
                .then((e) => {
                    return validAccessService(e);
                })
                .then((e) => {
                    return ApplicationsService.findOne(_idu, e)
                })
                .then((e) => {
                    resolve(e);
                })
                .catch((err) => {
                    reject(err);
                });

        });
    }


    static updateTeamApplication(_id, _idu, arch, owner) {

        return new Promise(function (resolve, reject) {

            accessMergeTransform(owner, "members", {_id}, Access.ROLE_READ)
                .then((e) => {
                    return new TeamRepository()
                        .findOne(e)
                })
                .then((e) => {
                    return validAccessService(e);
                })
                .then((e) => {
                    const owners = [e, owner]; //merge team access + users access, to determine great then roles

                    return ApplicationsService
                        .update(_idu, arch, owners)
                })
                .then((e) => {
                    resolve(e);
                })
                .catch((err) => {
                    reject(err);
                });


        });
    }

    static deleteTeamApplication(_id, _idu, owner) {

        return new Promise(function (resolve, reject) {

            accessMergeTransform(owner, "members", {_id}, Access.ROLE_READ)
                .then((e) => {
                    return new TeamRepository()
                        .findOne(e)
                })
                .then((e) => {
                    return validAccessService(e);
                })
                .then((e) => {
                    const owners = [e, owner]; //merge team access + users access, to determine great then roles

                    return ApplicationsService
                        .remove(_idu, owners)
                })
                .then((e) => {
                    resolve(e);
                })
                .catch((err) => {
                    reject(err);
                });

        });
    }

    static createTeamApplication(_id, arch, owner) {

        return new Promise(function (resolve, reject) {

            accessMergeTransform(owner, "members", {_id}, Access.ROLE_WRITER)
                .then((e) => {
                    return new TeamRepository()
                        .findOne(e)
                })
                .then((e) => {
                    return validAccessService(e);
                })
                .then((e) => {
                    return ApplicationsService.create(arch, formatFactoryRefs(e, 'teams'));
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

module.exports = ApplicationsService;
