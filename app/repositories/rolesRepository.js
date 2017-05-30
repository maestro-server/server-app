'use strict';

const Repository = require('./Repository');

const validAccess = require('./validators/validAccess');
const validAccessUpdater = require('./validators/validAccessUpdater');

const filledTransform = require('./transforms/filledTransform');

const formatRefsCollection = require('./format/formatRefsCollection');
const formatDelCollection = require('./format/formatDelCollection');
const formatNotEqual = require('./format/formatNotEqual');
const {ObjectId} = require('mongorito');

class RolesRepository extends Repository {

    /**
     *
     * filled = fields usgin to create a new entiti
     * resFilled = fields with show to result
     */
    constructor(dao, resFilled = null, filled = null) {
        super();
        this.setResFilled(resFilled);
        this.setFilled(filled || ['id', 'role', 'refs']);

        this.dao = dao;
    }

    save(filter, roles) {

      return new Promise((resolve, reject) => {


          filledTransform(roles, this.filled)
              .then((e) => {
                  return validAccess(e);
              })
              .then((e) => {
                  const role = parseInt(e.role);
                  const id = e._id;
                  const {refs} = e;

                  const arr = formatRefsCollection(id, refs, this.dao.role, {role});
                  formatNotEqual(filter, `${this.dao.role}._id`, id);

                  return this.add(filter, arr);
              })
              .then((e) => {
                  resolve(e);
              })
              .catch((err) => {
                  reject(err);
              });

      });

    }


    add(filter, roles) {

        return new Promise((resolve, reject) => {

            new this.dao(roles)
                .updateByPushUnique(filter)
                .then((e) => {
                    return validAccessUpdater(e);
                })
                .then((e) => {
                    resolve(e.get(this.dao.role));
                })
                .catch((err) => {
                    reject(err);
                });

        });
    }



    remove(id, idu) {

        return new Promise((resolve, reject) => {

            const arr = formatDelCollection(idu, this.dao.role);

            new this.dao(arr)
                .updateByPull(id)
                .then((e) => {
                    return validAccessUpdater(e);
                })
                .then(() => {
                    resolve(id);
                })
                .catch((err) => {
                    reject(err);
                });

        });
    }

}

module.exports = RolesRepository;
