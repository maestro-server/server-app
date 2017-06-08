'use strict';

const _ = require('lodash');

const FactoryDBRepository = require('repositories/DBRepository');
const Access = require('entities/accessRole');

const accessMergeTransform = require('./roles/accessMergeTransform');

const validNotFound = require('./validators/validNotFound');
const collectionTransform = require('./transforms/collectionTransform');
const refsTransform = require('./transforms/refsTransform');
const singleTransform = require('./transforms/singleTransform');

const ClosurePromesify = require('libs/factoryPromisefy');


const Persistence = (Entity) => {

    const DBRepository = FactoryDBRepository(Entity);

    return {

        find (query, owner, access = Access.ROLE_READ) {

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

        findOne (_id, owner, access=Access.ROLE_READ) {

            return ClosurePromesify(() => {

                const query = accessMergeTransform(owner, "roles", {_id}, access);

                return DBRepository
                    .findOne(query)
                    .then((e) => {
                        return refsTransform(e, 'roles');
                    });
            });
        },

        update (_id, post, owner) {

            return ClosurePromesify(() => {

                const query = accessMergeTransform(owner, "roles", {_id}, Access.ROLE_WRITER);

                return DBRepository
                    .update(query, post);
            });
        },

        create (post, owner) {

            return ClosurePromesify(() => {

                const data = _.merge(post, {owner});

                return DBRepository
                    .create(data)
                    .then((e) => {
                        return refsTransform(e, 'roles');
                    })
                    .then((e) => {
                        return singleTransform(e, Entity.name);
                    });
            });
        },

        remove(_id, owner) {

            return ClosurePromesify(() => {

                const query = accessMergeTransform(owner, "roles", {_id}, Access.ROLE_ADMIN);

                return DBRepository
                    .remove(query);
            });
        }

    };
};

module.exports = Persistence;
