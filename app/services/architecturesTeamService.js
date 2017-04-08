'use strict';

const TeamRepository = require('../repositories/teamsRepository');

const accessMergeTransform = require('./transforms/accessMergeTransform');

const validAccessService = require('./validators/validAccessService');
const formatFactoryRefs = require('./helpers/formatFactoryRefs');

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
                    return ArchitecturesService.findOne(_idu, e)
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
                        .findOne(e)
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
                        .findOne(e)
                })
                .then((e) => {
                    return validAccessService(e);
                })
                .then((e) => {
                    const owners = [e, owner]; //merge team access + users access, to determine great then roles

                    return ArchitecturesService
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


    static createTeamArchitectures(_id, arch, owner) {

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


}

module.exports = ArchitecturesTeamService;
