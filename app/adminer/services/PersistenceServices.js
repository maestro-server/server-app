'use strict';

const ProxyDBRepository = require('adminer/repositories/ProxyDBRepository');

const Persistence = require('core/services/PersistenceServices');


const UsersPersistence = (Entity) => {

    const DBRepository = ProxyDBRepository(Entity);

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
