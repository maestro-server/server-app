'use strict';

const ProxyDBRepository = require('adminer/repositories/ProxyDBRepository');
const ClosurePromesify = require('core/libs/factoryPromisefy');

const Persistence = require('core/services/PersistenceServices');


const UsersPersistence = (Entity) => {

    const DBRepository = ProxyDBRepository(Entity);

    return Object.assign({}, Persistence(Entity), {

        create (post) {

            return ClosurePromesify(() => {
                const {value} = post;

                return DBRepository
                    .update({value}, post);
            });
        }
    });
};

module.exports = UsersPersistence;
