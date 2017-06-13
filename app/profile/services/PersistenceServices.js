'use strict';

const _ = require('lodash');

const FactoryDBRepository = require('core/repositories/DBRepository');
const ClosurePromesify = require('core/libs/factoryPromisefy');
const factoryValid = require('core/libs/factoryValid');

const validDuplicateUser = require('./validator/validDuplicateUser');

const Persistence = require('core/services/PersistenceServices');


const UsersPersistence = (Entity) => {

    const DBRepository = FactoryDBRepository(Entity);

    return Object.assign(Persistence(Entity), {

        create (post) {

            return ClosurePromesify(() => {

                return validDuplicateUser(DBRepository, post)
                    .then(() => {
                        return DBRepository
                            .create(post);
                    });
            });
        },

        findOne (_id) {

            return ClosurePromesify(() => {

                return DBRepository
                    .findOne({_id});
            });
        },

        update (_id, post) {
            return ClosurePromesify(() => {

                return validDuplicateUser(DBRepository, post)
                    .then(() => {
                        return DBRepository
                            .update({_id}, post);
                    });
            });

        },

        remove(_id) {

            return ClosurePromesify(() => {

                return DBRepository
                    .remove({_id});
            });
        }
    });
};

module.exports = UsersPersistence;
