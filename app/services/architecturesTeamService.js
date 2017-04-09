'use strict';

const TeamRepository = require('../repositories/teamsRepository');

const accessMergeTransform = require('./transforms/accessMergeTransform');

const validAccessService = require('./validators/validAccessService');
const formatFactoryRefs = require('./helpers/formatFactoryRefs');

const ArchitecturesService = require('./architecturesService');

const Access = require('../entities/accessRole');

class ArchitecturesTeamService {


    static findTeamArchitectures(_id, query, owner) {

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
                    return ArchitecturesService.find(query, e);
                })
                .then((e) => {
                    resolve(e);
                })
                .catch((err) => {
                    reject(err);
                });

        });
    }

    static findOneTeamArchitectures(_id, _idu, query, owner) {

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
                    return ArchitecturesService.findOne(_idu, e);
                })
                .then((e) => {
                    resolve(e);
                })
                .catch((err) => {
                    reject(err);
                });

        });
    }


    static updateTeamArchitectures(_id, _idu, arch, owner) {

        return new Promise(function (resolve, reject) {

            accessMergeTransform(owner, "members", {_id}, Access.ROLE_READ)
                .then((e) => {
                    return new TeamRepository()
                        .findOne(e);
                })
                .then((e) => {
                    return validAccessService(e);
                })
                .then((e) => {
                    const owners = [e, owner]; //merge team access + users access, to determine great then roles

                    return ArchitecturesService
                        .update(_idu, arch, owners);
                })
                .then((e) => {
                    resolve(e);
                })
                .catch((err) => {
                    reject(err);
                });


        });
    }

    static deleteTeamArchitectures(_id, _idu, owner) {

        return new Promise(function (resolve, reject) {

            accessMergeTransform(owner, "members", {_id}, Access.ROLE_READ)
                .then((e) => {
                    return new TeamRepository()
                        .findOne(e);
                })
                .then((e) => {
                    return validAccessService(e);
                })
                .then((e) => {
                    const owners = [e, owner]; //merge team access + users access, to determine great then roles

                    return ArchitecturesService
                        .remove(_idu, owners);
                })
                .then((e) => {
                    resolve(e);
                })
                .catch((err) => {
                    reject(err);
                });

        });
    }


    static createTeamArchitectures(_id, arch, owner) {

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
                    return ArchitecturesService.create(arch, formatFactoryRefs(e, 'teams'));
                })
                .then((e) => {
                    resolve(e);
                })
                .catch((err) => {
                    reject(err);
                });

        });

    }

    static addRolesTeamArchitectures(_id, _idu, roles, owner) {

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
                    return ArchitecturesService
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

    static updateRolesTeamArchitectures(_id, _idu, _ida, roles, owner) {

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
                    return ArchitecturesService
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

    static deleteRolesTeamArchitectures(_id, _idu, _ida, owner) {

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
                    return ArchitecturesService
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

module.exports = ArchitecturesTeamService;
