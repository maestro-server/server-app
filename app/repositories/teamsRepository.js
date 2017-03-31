'use strict';

import TeamDao from './daos/team';
import validTeam from './validators/validTeam';

import filledTransform from './transforms/filledTransform';
import activeTransform from './transforms/activeTransform';

import merger from './transforms/mergeTransform';

import formatRefsCollection from './format/formatRefsCollection';


class TeamsRepository {

    /**
     *
     * filled = fields usgin to create a new entiti
     * resFilled = fields with show to result
     */
    constructor(resFilled=null, filled=null) {
        this.setFilled(filled || ['name', 'email', 'url', 'avatar', 'owner', 'members.role', 'access', 'qtds']);
        this.setResFilled(resFilled || ['_id', 'name', 'email', 'url', 'avatar', 'owner', 'qtds', 'members']);
    }

    setFilled (val) {
      this.filled = val;
    }

    setResFilled (val) {
      this.resFilled = val;
    }

    find(filters = {}, limit = 20, skip = 0) {

        return new Promise((resolve, reject) => {

            filledTransform(filters, this.filled)
                .then((e) => {
                    return activeTransform.active(e);
                })
                .then((filters) => {
                    return TeamDao
                        .limit(limit)
                        .skip(skip)
                        .sort('created_at', -1)
                        .include(this.resFilled)
                        .find(filters)
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
                .then((filters) => {
                    return TeamDao
                        .count(filters)
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
                    return TeamDao
                        .findOne(e)
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
                    return validTeam(e)
                })
                .then((e) => {
                    return new TeamDao(e)
                        .updateAndModify(id);
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
                .then((e) => {
                    return new TeamDao(e)
                        .updateAndModify(_id);
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

    create(team) {

        return new Promise((resolve, reject) => {

            filledTransform(team, this.filled)
                .then((e) => {
                    return validTeam(e);
                })
                .then((e) => {
                    return activeTransform.active(e);
                })
                .then((e) => {
                    return merger(e, formatRefsCollection(e.owner._id, 'users', 'members', {role: 'admin'}, true));
                })
                .then((e) => {
                    return new TeamDao(e).save()
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
}

module.exports = TeamsRepository;
