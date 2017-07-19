'use strict';

const _ = require('lodash');

const DFactoryDBRepository = require('core/repositories/DBRepository');
const ClosurePromesify = require('core/libs/factoryPromisefy');

const Access = require('core/entities/accessRole');
const accessMergeTransform = require('./transforms/accessMergeTransform');


const Persistence = (Entity, FactoryDBRepository = DFactoryDBRepository) => {

    const DBRepository = FactoryDBRepository(Entity);

    return {

        find (query, owner, access = Access.ROLE_READ) {

            return ClosurePromesify(() => {

                const limit = _.parseInt(query.limit);
                const page = _.parseInt(query.page);
                const skip = limit * (page - 1);

                query = accessMergeTransform(owner, Entity.access, query, access);

                return Promise.all([
                    DBRepository.find(query, limit, skip),
                    DBRepository.count(query)
                ]);
            });
        },

        findOne (_id, owner, access = Access.ROLE_READ) {

            return ClosurePromesify(() => {

                const query = accessMergeTransform(owner, Entity.access, {_id}, access);

                return DBRepository
                    .findOne(query);
            });
        },

        update (_id, post, owner, access = Access.ROLE_WRITER) {

            return ClosurePromesify(() => {

                const query = accessMergeTransform(owner, Entity.access, {_id}, access);
                const fill = _.difference(Entity.filled, ['owner', Entity.access, 'password', '_id']);

                return DBRepository
                    .update(query, post, fill);
            });
        },

        create (post) {
            return ClosurePromesify(() => {
                return DBRepository
                    .create(post);
            });
        },

        remove(_id, owner, access = Access.ROLE_ADMIN) {

            return ClosurePromesify(() => {

                const query = accessMergeTransform(owner, Entity.access, {_id}, access);

                return DBRepository
                    .remove(query);
            });
        }

    };
};

module.exports = _.curry(Persistence);
