'use strict';

const _ = require('lodash');

const FactoryDBRepository = require('core/repositories/DBRepository');
const ClosurePromesify = require('core/libs/factoryPromisefy');

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

                console.log(_id);

                return DBRepository
                    .findOne({_id});
            });
        },

        update (_id, post) {
            return ClosurePromesify(() => {

                return validDuplicateUser(DBRepository, post)
                    .then(() => {

                        const fill = _.pull(Entity.filled, 'owner', Entity.access, 'password');
                        return DBRepository
                            .update({_id}, post, fill);
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
