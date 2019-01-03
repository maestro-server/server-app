'use strict';

const _ = require('lodash');

const hookFactory = require('core/hooks/factory');
const FactoryDBRepository = require('core/repositories/DBRepository');
const validDuplicateUser = require('./validator/validDuplicateUser');
const Persistence = require('core/services/PersistenceServices');


const UsersPersistence = (Entity) => {

    const DBRepository = FactoryDBRepository(Entity);

    return Object.assign({}, Persistence(Entity), {

        create (post) {

            return new Promise((resolve, reject) => {

                return validDuplicateUser(DBRepository, post)
                    .then(() => {
                        return DBRepository
                            .create(post);
                    })
                    .then(resolve)
                    .catch(reject);
            });
        },

        findOne (_id) {

            return new Promise((resolve, reject) => {

                return DBRepository
                    .findOne({_id})
                    .then(resolve)
                    .catch(reject);
            });
        },

        patch (_id, post, user) {
            return new Promise((resolve, reject) => {
                const entityHooks = hookFactory(Entity, {_id, user});

                return validDuplicateUser(DBRepository, post)
                    .then(() => {
                        const fill = _.difference(Entity.filled, ['owner', Entity.access, 'password']);
                        return DBRepository
                            .patch({_id}, post, fill);
                    })
                    .then(entityHooks('after_patch'))
                    .then(resolve)
                    .catch(reject);
            });

        },

        remove(_id, user) {

            return new Promise((resolve, reject) => {
                const entityHooks = hookFactory(Entity, {_id, user});

                return DBRepository
                    .remove({_id})
                    .then(entityHooks('after_delete'))
                    .then(resolve)
                    .catch(reject);
            });
        }
    });
};

module.exports = UsersPersistence;
