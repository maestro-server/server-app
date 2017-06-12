'use strict';

const _ = require('lodash');

const FactoryDBRepository = require('repositories/DBRepository');
const ClosurePromesify = require('libs/factoryPromisefy');
const factoryValid = require('libs/factoryValid');

const validDuplicateUser = require('./validator/validDuplicateUser');

const Persistence = require('services/PersistenceServices');


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

        }
    });
};

module.exports = UsersPersistence;
