'use strict';

const _ = require('lodash');
const in_maker = require('core/libs/in_maker');
const Access = require('../entities/accessRole');

const DFactoryDBRepository = require('core/repositories/DBRepository');
const validNotEqual = require('core/services/validator/validNotEqual');

const accessMergeTransform = require('./transforms/accessMergeTransform');

const factoryValid = require('core/libs/factoryValid');
const accessValid = require('core/validators/accessValid');

const validAccessEmpty = require('core/applications/validator/validAccessEmpty');
const {transfID} = require('core/applications/transforms/mapRelationToObjectID');

const hookFactory = require('core/hooks/factory');

const AccessServices = (Entity, FactoryDBRepository = DFactoryDBRepository) => {

    const DBRepository = FactoryDBRepository(Entity);

    return {
        addRoles (_id, post, user) {

            return new Promise((resolve, reject) => {

                factoryValid(post, accessValid.create);

                const access = Object.assign({}, {
                    _id: in_maker(post.id),
                    refs: post.refs,
                    role: parseInt(post.role)
                },
                    _.pick(post, 'name', 'email')
                );

                const prepared = _.assign({},
                  accessMergeTransform(user, Entity.access, {_id}, Access.ROLE_ADMIN),
                  validNotEqual(`${Entity.access}._id`, access._id)
                );

                return DBRepository
                    .updateByPushUnique(prepared, {[Entity.access]: access}, Entity.access)
                    .then(resolve)
                    .catch(reject);
            });

        },

        updateRoles (_id, post, user) {

          return new Promise((resolve, reject) => {
              const entityHooks = hookFactory(Entity, {_id, user});

              const prepared = _.assign({},
                accessMergeTransform(user, Entity.access, {_id}, Access.ROLE_ADMIN)
              );

              const roles = post.map(e=>transfID(e, '_id'));

              return DBRepository
                  .findOne(prepared)
                  .then(validAccessEmpty)
                  .then((preparedData) => {
                    const data = _.assign(preparedData, {[Entity.access]: roles});

                    return DBRepository
                        .update(prepared, data);
                  })
                  .then(entityHooks('after_update'))
                  .then(resolve)
                  .catch(reject);
          });
        },

        updateSingleRoles (_id, _idu, roles, user) {

            return new Promise((resolve, reject) => {

                factoryValid(roles, accessValid.update);

                return AccessServices(Entity, FactoryDBRepository).deleteRoles(_id, _idu, user)
                    .then(() => {
                        const roler = Object.assign({}, roles, {id: _idu});
                        return AccessServices(Entity).addRoles(_id, roler, user);
                    })
                    .then(resolve)
                    .catch(reject);
            });
        },

        deleteRoles (_id, _idu, user, access = Access.ROLE_ADMIN) {

            return new Promise((resolve, reject) => {
                const prepared = accessMergeTransform(user, Entity.access, {_id}, access);

                const arr = {
                    [Entity.access]: {
                        _id: in_maker(_idu)
                    }
                };

                return DBRepository
                    .updateByPull(prepared, arr, Entity.access)
                    .then(resolve)
                    .catch(reject);
            });
        }
    };

};

module.exports = _.curry(AccessServices);
