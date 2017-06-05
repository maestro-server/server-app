'use strict';

const RolesRepository = require('../../repositories/rolesRepository');

const accessMergeTransform = require('../transforms/accessMergeTransform');
const collectionRefsTransform = require('../transforms/collectionRefsTransform');

const Access = require('../../entities/accessRole');

class rolesService {

    constructor (entity) {
        this.entity = entity;

        this.repository = new RolesRepository(entity);

        return this;
    }


    updateRoles (_id, _idu, roles, owner) {
        return new Promise((resolve, reject) => {

            accessMergeTransform(owner, this.entity.role, {_id}, Access.ROLE_ADMIN)
                .then((e) => {
                    return this.repository
                        .remove(e, _idu);
                })
                .then((e) => {

                    Object.assign(roles, {id: _idu});

                    return this.repository
                        .save(e, roles);
                })
                .then((e) => {
                    return collectionRefsTransform([e], _id, this.entity.db);
                })
                .then((e) => {
                    resolve(e);
                })
                .catch((err) => {
                    reject(err);
                });

        });
    }

    addRoles (_id, roles, owner) {

        return new Promise((resolve, reject) => {

            accessMergeTransform(owner, this.entity.role, {_id}, Access.ROLE_ADMIN)
                .then((e) => {
                    return this.repository
                        .save(e, roles);
                })
                .then((e) => {
                    return collectionRefsTransform([e], _id, this.entity.db);
                })
                .then((e) => {
                    resolve(e);
                })
                .catch((err) => {
                    reject(err);
                });

        });

    }

    deleteRoles (_id, _idu, owner) {
        return new Promise((resolve, reject) => {

            accessMergeTransform(owner, this.entity.role, {_id}, Access.ROLE_ADMIN)
                .then((e) => {
                    return this.repository
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

module.exports = rolesService;
