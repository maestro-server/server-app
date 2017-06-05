'use strict';

const FactoryDBRepository = require('repositories/DBRepository');
const Access = require('entities/accessRole');

const accessMergeTransform = require('./roles/accessMergeTransform');

const validNotFound = require('./validators/validNotFound');
const collectionTransform = require('./transforms/collectionTransform');

const ClosurePromesify = require('libs/factoryPromisefy');


const Persistence = (Entity) => {

    const DBRepository = FactoryDBRepository(Entity);

    return {

        find: (query, owner, access = Access.ROLE_READ) => {

            return ClosurePromesify(() => {

                const limit = parseInt(query.limit) || 20;
                const page = parseInt(query.page) || 1;
                const skip = limit * (page - 1);

                query = accessMergeTransform(owner, "roles", query, access);

                return Promise.all([
                        DBRepository.find(query, limit, skip),
                        DBRepository.count(query)
                    ])
                    .then((e) => {
                        return validNotFound(e, e[1], limit, page);
                    })
                    .then((e) => {
                        return collectionTransform(e[0], e[1], Entity.name, limit, page);
                    });
            });
        },

        findOne(_id, owner, access=Access.ROLE_READ) {

            return ClosurePromesify(() => {

                const query = accessMergeTransform(owner, "roles", {_id}, access);

                return DBRepository
                    .findOne(query)
                    .then((e) => {
                        return refsTransform(e, 'roles');
                    });
            });
        }

    };
};

module.exports = Persistence;
