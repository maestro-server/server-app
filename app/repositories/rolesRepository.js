'use strict';

const Repository = require('./Repository');

const validAccess = require('./validators/validAccess');
const validAccessUpdater = require('./validators/validAccessUpdater');

const filledTransform = require('./transforms/filledTransform');

const formatRefsCollection = require('./format/formatRefsCollection');
const formatDelCollection = require('./format/formatDelCollection');
const formatNotEqual = require('./format/formatNotEqual');

const _ = require('lodash');
const formtObjectId = require('./format/formatObjectId');

class RolesRepository extends Repository {

    /**
     *
     * filled = fields usgin to create a new entiti
     * resFilled = fields with show to result
     */
    constructor(dao, resFilled = null, filled = null) {
        super();
        this.setResFilled(resFilled);
        this.setFilled(filled || ['id', 'role', 'refs', 'name', 'email']);

        this.dao = dao;
    }

    save(filter, roles) {

      return new Promise((resolve, reject) => {


          filledTransform(roles, this.filled)
              .then((e) => {
                  return validAccess(e);
              })
              .then((e) => {
                  roles = formtObjectId(roles);
                  e = formtObjectId(e);

                  const role = parseInt(e.role);
                  const _id = e.id;
                  const {refs} = e;


                  const cc = _.pick(roles, 'name', 'email');
                  const clean = _.merge(cc, {_id});

                  const arr = formatRefsCollection(clean, refs, this.dao.role, {role});
                  formatNotEqual(filter, `${this.dao.role}._id`, _id);

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



    remove(filter, idu) {

        return new Promise((resolve, reject) => {

            const arr = formatDelCollection(idu, this.dao.role);

            new this.dao(arr)
                .updateByPull(filter)
                .then((e) => {
                    return validAccessUpdater(e);
                })
                .then(() => {
                    resolve(filter);
                })
                .catch((err) => {
                    reject(err);
                });

        });
    }

}

module.exports = RolesRepository;
