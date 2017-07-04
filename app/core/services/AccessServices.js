'use strict';

const _ = require('lodash');
const {ObjectId} = require('mongorito');
const Access = require('../entities/accessRole');

const DFactoryDBRepository = require('core/repositories/DBRepository');
const ClosurePromesify = require('core/libs/factoryPromisefy');
const validNotEqual = require('core/services/validator/validNotEqual');

const accessMergeTransform = require('./transforms/accessMergeTransform');

const factoryValid = require('core/libs/factoryValid');
const accessValid = require('core/validators/accessValid');

const AccessServices = (Entity, FactoryDBRepository = DFactoryDBRepository) => {

    const DBRepository = FactoryDBRepository(Entity);

    return {
        addRoles (_id, post, owner) {

            return ClosurePromesify(() => {

                factoryValid(post, accessValid.create);

                const access = _.merge({}, {
                    _id: ObjectId(post.id),
                    refs: post.refs,
                    role: parseInt(post.role)
                },
                    _.pick(post, 'name', 'email')
                );

                const query = _.merge({},
                  accessMergeTransform(owner, Entity.access, {_id}, Access.ROLE_ADMIN),
                  validNotEqual(`${Entity.access}._id`, access._id)
                );

                return DBRepository
                    .updateByPushUnique(query, {[Entity.access]: access}, Entity.access);
            });

        },

        updateRoles (_id, _idu, roles, owner) {

            return ClosurePromesify(() => {

                factoryValid(roles, accessValid.update);

                return AccessServices(Entity, FactoryDBRepository).deleteRoles(_id, _idu, owner)
                    .then(() => {
                        const roler = Object.assign({}, roles, {id: _idu});
                        return AccessServices(Entity).addRoles(_id, roler, owner);
                    });
            });
        },

        deleteRoles (_id, _idu, owner) {

            return ClosurePromesify(() => {
                const query = accessMergeTransform(owner, Entity.access, {_id}, Access.ROLE_ADMIN);

                const arr = {
                    [Entity.access]: {
                        _id: ObjectId(_idu)
                    }
                };

                return DBRepository
                    .updateByPull(query, arr, Entity.access);
            });
        }
    };

};

module.exports = AccessServices;
