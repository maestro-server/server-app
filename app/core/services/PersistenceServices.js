'use strict';

const _ = require('lodash');

const DFactoryDBRepository = require('core/repositories/DBRepository');

const Access = require('core/entities/accessRole');
const accessMergeTransform = require('./transforms/accessMergeTransform');
const regexFilterQuery = require('./transforms/regexFilterQuery');

const hookFactory = require('core/hooks/factory');
const validAccessEmpty = require('core/applications/validator/validAccessEmpty');
const updateMerge = require('./transforms/updateMerge');
const mapArrIn = require('./transforms/mapArrIn');


const Persistence = (Entity, FactoryDBRepository = DFactoryDBRepository) => {

    const DBRepository = FactoryDBRepository(Entity);

    return {

        find (query, user, access = Access.ROLE_READ) {
            return new Promise((resolve, reject) => {

                query =  mapArrIn(query);

                const prepared = _.assign({},
                  query,
                  accessMergeTransform(user, Entity.access, query, access),
                  ...regexFilterQuery(_.get(query, 'query'))
                );

                return Promise.all([
                          DBRepository.find(prepared),
                          DBRepository.count(prepared)
                        ])
                        .then(resolve)
                        .catch(reject);
            });
        },

        count (query, user, access = Access.ROLE_READ) {
            return new Promise((resolve, reject) => {

                query =  mapArrIn(query);

                const prepared = _.assign({},
                  query,
                  accessMergeTransform(user, Entity.access, query, access),
                  ...regexFilterQuery(_.get(query, 'query'))
                );

                DBRepository.count(prepared)
                        .then(resolve)
                        .catch(reject);
            });
        },

        findOne (_id, user, access = Access.ROLE_READ) {

            return new Promise((resolve, reject) => {

                const prepared = accessMergeTransform(user, Entity.access, {_id}, access);

                return DBRepository
                    .findOne(prepared)
                    .then(resolve)
                    .catch(reject);
            });
        },

        update (_id, post, user, access = Access.ROLE_WRITER) {

            return new Promise((resolve, reject) => {
                const entityHooks = hookFactory(Entity, {_id, user});
                const fill = _.slice(Entity.singleFilled, 2);
                const prepared = accessMergeTransform(user, Entity.access, {_id}, access);

                return DBRepository
                    .findOne(prepared)
                    .then(validAccessEmpty)
                    .then(updateMerge(post)(Entity))
                    .then((preparedData) => {
                      return DBRepository
                          .update(prepared, preparedData, fill);
                    })
                    .then(entityHooks('after_update'))
                    .then(resolve)
                    .catch(reject);
            });
        },

        patch (_id, post, user, access = Access.ROLE_WRITER) {

            return new Promise((resolve, reject) => {

                const entityHooks = hookFactory(Entity, {_id, user});
                const fill = _.difference(Entity.filled, ['owner', Entity.access, 'password', '_id']);

                const prepared = accessMergeTransform(user, Entity.access, {_id}, access);

                return DBRepository
                    .patch(prepared, post, fill)
                    .then(entityHooks('after_patch'))
                    .then(resolve)
                    .catch(reject);
            });
        },

        create (post) {
            return new Promise((resolve, reject) => {
                const user = _.get(post, 'owner');
                const entityHooks = hookFactory(Entity, {user});

                return DBRepository
                    .create(post)
                    .then(entityHooks('after_create'))
                    .then(resolve)
                    .catch(reject);
            });
        },

        remove(_id, user, body = {}, access = Access.ROLE_ADMIN) {

            return new Promise((resolve, reject) => {
                const entityHooks = hookFactory(Entity, {_id, user});
                const prepared = accessMergeTransform(user, Entity.access, {_id}, access);

                return DBRepository
                    .remove(prepared, body)
                    .then(entityHooks('after_delete'))
                    .then(resolve)
                    .catch(reject);
            });
        }

    };
};

module.exports = _.curry(Persistence);
