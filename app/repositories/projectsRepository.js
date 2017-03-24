'use strict';

import ProjectDao from './daos/project';
import validProject from './validators/validProject';

import filledTransform from './transforms/filledTransform';
import activeTransform from './transforms/activeTransform';

class ProjectsRepository {


    /**
     *
     * filled = fields usgin to create a new entiti
     * resFilled = fields with show to result
     * filterFilled = fields using to filters find
     */
    constructor() {
        this.filled = ['name', 'owner', 'servers', 'applications'];
        this.resFilled = ['_id', 'name', 'owner', 'servers', 'applications'];
    }

    find(filters = {}, limit = 20, skip = 0) {

        return new Promise((resolve, reject) => {

            activeTransform.active(filters)
                .then((filters) => {
                    return ProjectDao
                        .limit(limit)
                        .skip(skip)
                        .sort('created_at', -1)
                        .include(this.resFilled)
                        .find(filters)
                })
                .then((e) => {
                    resolve(e)
                })
                .catch((err) => {
                    reject(err);
                });

        });

    }

    findOne(filter) {

        return new Promise((resolve, reject) => {

            activeTransform.active(filter)
                .then((filter) => {
                    return ProjectDao
                        .findOne(filter)
                })
                .then((e) => {
                    resolve(e)
                })
                .catch((err) => {
                    reject(err);
                });

        });

    }

    update(id, user) {

        return new Promise((resolve, reject) => {

            filledTransform(user, this.filled)
                .then((e) => {
                    return validProject(e)
                })
                .then((e) => {
                    return new ProjectDao(e)
                        .updateById(id);
                })
                .then((e) => {
                    return filledTransform(e.get(), this.resFilled);
                })
                .then((e) => {
                    resolve(e)
                })
                .catch((err) => {
                    reject(err);
                });

        });

    }

    remove(_id) {

        return new Promise((resolve, reject) => {

            activeTransform.desactive({})
                .then((user) => {
                    return new ProjectDao(user)
                        .updateById(_id);
                })
                .then((e) => {
                    return filledTransform(e.get(), this.resFilled);
                })
                .then((e) => {
                    resolve(e);
                })
                .catch((err) => {
                    reject(err);
                });

        });
    }

    create(user) {

        return new Promise((resolve, reject) => {

            filledTransform(user, this.filled)
                .then((e) => {
                    return validProject(e);
                })
                .then((e) => {
                    return activeTransform.active(e);
                })
                .then((e) => {
                    return new ProjectDao(e).save()
                })
                .then((e) => {
                    return filledTransform(e.get(), this.resFilled);
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

module.exports = ProjectsRepository;
