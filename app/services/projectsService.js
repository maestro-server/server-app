'use strict';

import TeamRepository from '../repositories/teamsRepository';
import ProjectRepository from '../repositories/projectsRepository';

import merger from '../repositories/transforms/mergeTransform';
import refsTransform from './transforms/refsTransform';
import singleTransform from './transforms/singleTransform';
import collectionTransform from './transforms/collectionTransform';
import accessMergeTransform from './transforms/accessMergeTransform';
import accessMergeCollectionTransform from './transforms/accessMergeCollectionTransform';

import validAccessService from './validators/validAccessService';
import validNotFound from './validators/validNotFound';
import formatFactoryRefs from './helpers/formatFactoryRefs';

import Access from '../entities/accessRole';

class ProjectsService {

    static find(query, owner) {

        return new Promise(function (resolve, reject) {

            const limit = parseInt(query.limit) || 20;
            const page = parseInt(query.page) || 1;
            const skip = limit * (page - 1);

            accessMergeCollectionTransform([owner._id], 'owner._id', query)
                .then((e) => {
                    return Promise.all([
                        new ProjectRepository().find(e, limit, skip),
                        new ProjectRepository().count(e)
                    ]);
                })
                .then((e) => {
                    return validNotFound(e, e[1], limit, page);
                })
                .then((e) => {
                    return collectionTransform(e[0], e[1], 'projects', limit, page);
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

            accessMergeCollectionTransform([owner._id], 'owner._id', {_id})
                .then((e) => {
                    return new ProjectRepository()
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

    static update(_id, project, owner) {

        return new Promise(function (resolve, reject) {

            accessMergeCollectionTransform([owner._id], 'owner._id', {_id})
                .then((e) => {
                    return new ProjectRepository()
                        .update(e, project)
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

            accessMergeCollectionTransform([owner._id], 'owner._id', {_id})
                .then((e) => {
                    return new ProjectRepository()
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

    static create(project, owner) {

        return new Promise(function (resolve, reject) {

            if (owner.hasOwnProperty('_ref'))
                owner._ref = 'users';

            merger(project, {owner})
                .then((e) => {
                    return new ProjectRepository()
                        .create(e)
                })
                .then((e) => {
                    return singleTransform(e, 'projects');
                })
                .then((e) => {
                    resolve(e);
                })
                .catch((err) => {
                    reject(err);
                });

        });

    }


    static findTeamProject(_id, query, owner) {

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
                    return ProjectsService.find(query, e)
                })
                .then((e) => {
                    resolve(e);
                })
                .catch((err) => {
                    reject(err);
                });

        });
    }

    static findOneTeamProject(_id, _idu, query, owner) {

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
                    return ProjectsService.findOne(_idu, e)
                })
                .then((e) => {
                    resolve(e);
                })
                .catch((err) => {
                    reject(err);
                });

        });
    }

    static createTeamProject(_id, project, owner) {

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
                    return ProjectsService.create(project, formatFactoryRefs(e, 'teams'))
                })
                .then((e) => {
                    resolve(e);
                })
                .catch((err) => {
                    reject(err);
                });

        });

    }

    static updateTeamProject(_id, _idu, project, owner) {

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
                    return ProjectsService
                        .update(_idu, project, e)
                })
                .then((e) => {
                    resolve(e);
                })
                .catch((err) => {
                    reject(err);
                });


        });
    }

    static deleteTeamProject(_id, _idu, owner) {

        return new Promise(function (resolve, reject) {

            accessMergeTransform(owner, "members", {_id}, Access.ROLE_ADMIN)
                .then((e) => {
                    return new TeamRepository()
                        .findOne(e)
                })
                .then((e) => {
                    return validAccessService(e);
                })
                .then((e) => {
                    return ProjectsService
                        .remove(_idu, e)
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

module.exports = ProjectsService;
