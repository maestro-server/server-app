'use strict';

const TeamDao = require('./daos/team');
const validAccess = require('./validators/validAccess');
const validAccessUpdater = require('./validators/validAccessUpdater');

const filledTransform = require('./transforms/filledTransform');
const merger = require('./transforms/mergeTransform');

const formatRefsCollection = require('./format/formatRefsCollection');
const formatDelCollection = require('./format/formatDelCollection');


class TeamMembersRepository {

    /**
     *
     * filled = fields usgin to create a new entiti
     * resFilled = fields with show to result
     */
    constructor(resFilled = null, filled = null) {
        this.setFilled(filled || ['id', 'role']);
    }

    setFilled(val) {
        this.filled = val;
    }


    add(filter, member) {

        return new Promise((resolve, reject) => {

            filledTransform(member, this.filled)
                .then((e) => {
                    return validAccess(e);
                })
                .then((e) => {
                    const arr = formatRefsCollection(e.id, 'users', 'members', {role: e.role});

                    return new TeamDao(arr)
                        .updateByPushUnique(filter);
                })
                .then((e) => {
                    return validAccessUpdater(e);
                })
                .then((e) => {
                    resolve(e.get('members'))
                })
                .catch((err) => {
                    reject(err);
                });

        });
    }


    remove(id, idu, member) {

        return new Promise((resolve, reject) => {

            const arr = formatDelCollection(idu, 'members');

            new TeamDao(arr)
                .updateByPull(id)
                .then((e) => {
                    return validAccessUpdater(e);
                })
                .then((e) => {
                    resolve(e.get())
                })
                .catch((err) => {
                    reject(err);
                });

        });
    }

}

module.exports = TeamMembersRepository;
