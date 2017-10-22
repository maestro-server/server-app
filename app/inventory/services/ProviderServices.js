'use strict';

const _ = require('lodash');

const FactoryDBRepository = require('core/repositories/DBRepository');
const Persistence = require('core/services/PersistenceServices');


const UsersPersistence = (Entity) => {

    const DBRepository = FactoryDBRepository(Entity);

    return Object.assign({}, Persistence(Entity), {

        create (post) {
            return new Promise((resolve, reject) => {
                const entityHooks = hookFactory(Entity);

                return DBRepository
                    .create(post)
                    .then(entityHooks('after_create'))
                    .then(resolve)
                    .catch(reject);
            });
        }
    });
};

module.exports = UsersPersistence;
