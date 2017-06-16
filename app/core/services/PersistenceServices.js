'use strict';

const _ = require('lodash');

const FactoryDBRepository = require('core/repositories/DBRepository');
const ClosurePromesify = require('core/libs/factoryPromisefy');

const Access = require('core/entities/accessRole');

const accessMergeTransform = require('./roles/accessMergeTransform');


const Persistence = (Entity) => {

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

        findOne (_id, owner, access=Access.ROLE_READ) {

            return ClosurePromesify(() => {

                const query = accessMergeTransform(owner, Entity.access, {_id}, access);

                return DBRepository
                    .findOne(query);
            });
        },

        autocomplete(query, owner) {

            return ClosurePromesify(() => {

                let  name;
                if (query.hasOwnProperty('complete')) {
                    name = {$regex:query.complete, '$options' : 'i'};
                }

                return this
                    .find({name}, owner);
            });
        },

        update (_id, post, owner) {

            return ClosurePromesify(() => {

                const query = accessMergeTransform(owner, Entity.access, {_id}, Access.ROLE_WRITER);

                const fill = _.pull(Entity.filled, 'owner', Entity.access, 'password');

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

        remove(_id, owner) {

            return ClosurePromesify(() => {

                const query = accessMergeTransform(owner, Entity.access, {_id}, Access.ROLE_ADMIN);

                return DBRepository
                    .remove(query);
            });
        }

    };
};

module.exports = Persistence;
