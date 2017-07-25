'use strict';

const _ = require('lodash');

const DFactoryDBRepository = require('core/repositories/DBRepository');
const ClosurePromesify = require('core/libs/factoryPromisefy');

const Access = require('core/entities/accessRole');
const accessMergeTransform = require('./transforms/accessMergeTransform');
const regexFilterQuery = require('./transforms/regexFilterQuery');


const Persistence = (Entity, FactoryDBRepository = DFactoryDBRepository) => {

    const DBRepository = FactoryDBRepository(Entity);

    return {

        find (query, owner, access = Access.ROLE_READ) {
            return ClosurePromesify(() => {

                const prepared = _.assign({},
                  query,
                  accessMergeTransform(owner, Entity.access, query, access),
                  ...regexFilterQuery(_.get(query, 'query'))
                );

                return Promise.all([
                    DBRepository.find(prepared),
                    DBRepository.count(prepared)
                ]);
            });
        },

        findOne (_id, owner, access = Access.ROLE_READ) {

            return ClosurePromesify(() => {

                const prepared = accessMergeTransform(owner, Entity.access, {_id}, access);

                return DBRepository
                    .findOne(prepared);
            });
        },

        update (_id, post, owner, access = Access.ROLE_WRITER) {

            return ClosurePromesify(() => {

                const fill = _.difference(Entity.filled, ['owner', Entity.access, 'password', '_id']);

                const prepared = accessMergeTransform(owner, Entity.access, {_id}, access);

                return DBRepository
                    .update(prepared, post, fill);
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
                const prepared = accessMergeTransform(owner, Entity.access, {_id}, access);

                return DBRepository
                    .remove(prepared);
            });
        }

    };
};

module.exports = _.curry(Persistence);
