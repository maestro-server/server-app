'use strict';

import ArchitecturesRepository from '../repositories/architecturesRepository';

import merger from '../repositories/transforms/mergeTransform';
import refsTransform from './transforms/refsTransform';
import singleTransform from './transforms/singleTransform';
import collectionTransform from './transforms/collectionTransform';
import accessMergeTransform from './transforms/accessMergeTransform';
import collectionRefsTransform from './transforms/collectionRefsTransform';

import validNotFound from './validators/validNotFound';

import Access from '../entities/accessRole';

class ArchitecturesService {

    static find(query, owner, access=Access.ROLE_READ) {

        return new Promise(function (resolve, reject) {

            const limit = parseInt(query.limit) || 20;
            const page = parseInt(query.page) || 1;
            const skip = limit * (page - 1);

            accessMergeTransform(owner, "roles", query, access)
                .then((e) => {
                    return Promise.all([
                        new ArchitecturesRepository().find(e, limit, skip),
                        new ArchitecturesRepository().count(e)
                    ]);
                })
                .then((e) => {
                    return validNotFound(e, e[1], limit, page);
                })
                .then((e) => {
                    return collectionTransform(e[0], e[1], 'architectures', limit, page);
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
                    return new ArchitecturesRepository()
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
                    return new ArchitecturesRepository()
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
                    return new ArchitecturesRepository()
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

    static create(arch, owner) {

        return new Promise(function (resolve, reject) {


            merger(arch, {owner})
                .then((e) => {
                    return new ArchitecturesRepository()
                        .create(e)
                })
                .then((e) => {
                    return refsTransform(e, 'roles');
                })
                .then((e) => {
                    return singleTransform(e, 'architectures');
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

module.exports = ArchitecturesService;
