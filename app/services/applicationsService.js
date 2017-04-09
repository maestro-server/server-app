'use strict';

const ApplicationDao = require('../repositories/daos/application');
const ApplicationsRepository = require('../repositories/applicationsRepository');
const RolesService = require('./libs/rolesService');

const merger = require('../repositories/transforms/mergeTransform');
const refsTransform = require('./transforms/refsTransform');
const singleTransform = require('./transforms/singleTransform');
const collectionTransform = require('./transforms/collectionTransform');
const accessMergeTransform = require('./transforms/accessMergeTransform');

const validNotFound = require('./validators/validNotFound');

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
                        .findOne(e);
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

            accessMergeTransform(owner, "roles", {_id}, Access.ROLE_ADMIN)
                .then((e) => {
                    return new ApplicationsRepository()
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

    static create(app, owner) {

        return new Promise(function (resolve, reject) {

            merger(app, {owner})
                .then((e) => {
                    return new ApplicationsRepository()
                        .create(e);
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

    static addRoles(_id, member, owner) {

        return new RolesService(ApplicationDao)
            .addRoles(_id, member, owner);
    }

    static updateRoles(_id, _idu, member, owner) {

        return new RolesService(ApplicationDao)
            .updateRoles(_id, _idu, member, owner);
    }

    static deleteRoles(_id, _idu, owner) {

        return new RolesService(ApplicationDao)
            .deleteRoles(_id, _idu, owner);
    }


}

module.exports = ApplicationsService;
