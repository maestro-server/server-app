'use strict';

const DFactoryDBRepository = require('core/repositories/DBRepository');

const Persistence = require('core/services/PersistenceServices');


const UsersPersistence = (Entity, FactoryDBRepository = DFactoryDBRepository) => {

    const DBRepository = FactoryDBRepository(Entity);

    return Object.assign({}, Persistence(Entity), {

        create (post) {

            return new Promise((resolve, reject) => {
                const {value} = post;

                return DBRepository
                    .update({value}, post)
                    .then(resolve)
                    .catch(reject);
            });
        }
    });
};

module.exports = UsersPersistence;
