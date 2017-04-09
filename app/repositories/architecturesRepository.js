'use strict';

const Repository = require('./Repository');


const ArchitecturesDao = require('./daos/architecture');
const validArchitectures = require('./validators/validArchitectures');
const validAccessUpdater = require('./validators/validAccessUpdater');

const filledTransform = require('./transforms/filledTransform');
const activeTransform = require('./transforms/activeTransform');
const clearDaoTransform = require('./transforms/clearDaoTransform');

const merger = require('./transforms/mergeTransform');

const formatRefsCollection = require('./format/formatRefsCollection');

const Access = require('../entities/accessRole');


class ArchitecturesRepository extends Repository {

    /**
     *
     * filled = fields usgin to create a new entiti
     * resFilled = fields with show to result
     */
    constructor(resFilled = null, filled = null) {
        super();
        this.setFilled(filled || ['name', 'roles', 'owner']);
        this.setResFilled(resFilled || ['_id', 'name', 'roles', 'owner']);
    }


    find(filters = {}, limit = 20, skip = 0) {

        return new Promise((resolve, reject) => {

            filledTransform(filters, this.filled)
                .then((e) => {
                    return activeTransform.active(e);
                })
                .then((e) => {
                    return ArchitecturesDao
                        .limit(limit)
                        .skip(skip)
                        .sort('created_at', -1)
                        .include(this.resFilled)
                        .find(e);
                })
                .then((e) => {
                    return clearDaoTransform(e);
                })
                .then((e) => {
                    resolve(e);
                })
                .catch((err) => {
                    reject(err);
                });

        });

    }

    count(filters = {}) {

        return new Promise((resolve, reject) => {

            filledTransform(filters, this.filled)
                .then((e) => {
                    return activeTransform.active(e);
                })
                .then((e) => {
                    return ArchitecturesDao
                        .count(e);
                })
                .then((e) => {
                    resolve(e);
                })
                .catch((err) => {
                    reject(err);
                });

        });

    }

    findOne(filter) {

        return new Promise((resolve, reject) => {

            activeTransform.active(filter)
                .then((e) => {
                    return ArchitecturesDao
                        .findOne(e);
                })
                .then((e) => {
                    if (e)
                        e = e.get();

                    resolve(e);
                })
                .catch((err) => {
                    reject(err);
                });

        });

    }

    update(filter, team) {

        return new Promise((resolve, reject) => {

            this.excludeFilled('owner');
            this.excludeFilled('roles');

            filledTransform(team, this.filled)
                .then((e) => {
                    return validArchitectures(e);
                })
                .then((e) => {
                    return new ArchitecturesDao(e)
                        .updateAndModify(filter);
                })
                .then((e) => {
                    return validAccessUpdater(e);
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


    remove(filter) {

        return new Promise((resolve, reject) => {

            activeTransform.desactive({})
                .then((e) => {
                    return new ArchitecturesDao(e)
                        .updateAndModify(filter);
                })
                .then((e) => {
                    return validAccessUpdater(e);
                })
                .then((e) => {
                    resolve(e);
                })
                .catch((err) => {
                    reject(err);
                });

        });
    }

    create(arch) {

        return new Promise((resolve, reject) => {

            filledTransform(arch, this.filled)
                .then((e) => {
                    return validArchitectures(e);
                })
                .then((e) => {
                    return activeTransform.active(e);
                })
                .then((e) => {
                    return merger(e, formatRefsCollection(e.owner._id, e.owner._refs, 'roles', {role: Access.ROLE_ADMIN}, true));
                })
                .then((e) => {
                    return new ArchitecturesDao(e).save();
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

module.exports = ArchitecturesRepository;
