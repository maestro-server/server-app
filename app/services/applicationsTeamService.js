'use strict';

const TeamRepository = require('../repositories/teamsRepository');

const ApplicationsService = require('./applicationsService');

const accessMergeTransform = require('./transforms/accessMergeTransform');

const validAccessService = require('./validators/validAccessService');
const formatFactoryRefs = require('./helpers/formatFactoryRefs');

const Access = require('../entities/accessRole');

class ApplicationsTeamService {

    static findTeamApplication(_id, query, owner) {

        return new Promise(function (resolve, reject) {


            accessMergeTransform(owner, "members", {_id}, Access.ROLE_WRITER)
                .then((e) => {
                    return new TeamRepository()
                        .findOne(e);
                })
                .then((e) => {
                    return validAccessService(e);
                })
                .then((e) => {
                    return ApplicationsService.find(query, e);
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

            accessMergeTransform(owner, "members", {_id}, Access.ROLE_WRITER)
                .then((e) => {
                    return new TeamRepository()
                        .findOne(e);
                })
                .then((e) => {
                    return validAccessService(e);
                })
                .then((e) => {
                    return ApplicationsService.findOne(_idu, e);
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

    static addRolesTeamApplication(_id, _idu, roles, owner) {

        return new Promise(function (resolve, reject) {

            accessMergeTransform(owner, "members", {_id}, Access.ROLE_WRITER)
                .then((e) => {
                    return new TeamRepository()
                        .findOne(e);
                })
                .then((e) => {
                    return validAccessService(e);
                })
                .then((e) => {
                    return ApplicationsService
                        .addRoles(_idu, roles, e);
                })
                .then((e) => {
                    resolve(e);
                })
                .catch((err) => {
                    reject(err);
                });

        });

    }

    static updateRolesTeamApplication(_id, _idu, _ida, roles, owner) {

        return new Promise(function (resolve, reject) {

            accessMergeTransform(owner, "members", {_id}, Access.ROLE_WRITER)
                .then((e) => {
                    return new TeamRepository()
                        .findOne(e);
                })
                .then((e) => {
                    return validAccessService(e);
                })
                .then((e) => {
                    return ApplicationsService
                        .updateRoles(_idu, _ida, roles, e);
                })
                .then((e) => {
                    resolve(e);
                })
                .catch((err) => {
                    reject(err);
                });

        });
    }

    static deleteRolesTeamApplication(_id, _idu, _ida, owner) {

        return new Promise(function (resolve, reject) {

            accessMergeTransform(owner, "members", {_id}, Access.ROLE_WRITER)
                .then((e) => {
                    return new TeamRepository()
                        .findOne(e);
                })
                .then((e) => {
                    return validAccessService(e);
                })
                .then((e) => {
                    return ApplicationsService
                        .deleteRoles(_idu, _ida, e);
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

module.exports = ApplicationsTeamService;
