'use strict';

const TeamDao = require('./daos/team');
const validAccess = require('./validators/validAccess');
const validAccessUpdater = require('./validators/validAccessUpdater');

const filledTransform = require('./transforms/filledTransform');
const merger = require('./transforms/mergeTransform');

const formatRefsCollection = require('./format/formatRefsCollection');
const formatDelCollection = require('./format/formatDelCollection');
const formatNotEqual = require('./format/formatNotEqual');
const formatObjectId = require('./format/formatObjectId');

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

    save(filter, member) {

      return new Promise((resolve, reject) => {
        
          filledTransform(member, this.filled)
              .then((e) => {
                  return validAccess(e);
              })
              .then((e) => {
                  const role = parseInt(e.role);
                  const {id} = formatObjectId(e);

                  const arr = formatRefsCollection(id, 'users', 'members', {role});
                  formatNotEqual(filter, "members._id", id);

                  return this.add(filter, arr);
              })
              .then((e) => {
                  resolve(e)
              })
              .catch((err) => {
                  reject(err);
              });

      });

    }


    add(filter, member) {

        return new Promise((resolve, reject) => {

            new TeamDao(member)
                .updateByPushUnique(filter)
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
                    resolve(id)
                })
                .catch((err) => {
                    reject(err);
                });

        });
    }

}

module.exports = TeamMembersRepository;
