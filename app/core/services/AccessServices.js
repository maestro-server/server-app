'use strict';

const _ = require('lodash');
const {ObjectId} = require('mongorito');
const Access = require('../entities/accessRole');

const FactoryDBRepository = require('core/repositories/DBRepository');
const ClosurePromesify = require('core/libs/factoryPromisefy');

const accessMergeTransform = require('./roles/accessMergeTransform');
const formatNotEqual = require('core/format/formatNotEqual');

const factoryValid = require('core/libs/factoryValid');
const accessValid = require('core/services/validator/accessValid');

const AccessServices = (Entity) => {

    const DBRepository = FactoryDBRepository(Entity);

    return {
        addRoles (_id, post, owner) {

            return ClosurePromesify(() => {

                factoryValid(post, accessValid.create);

                let access = {};
                access[Entity.access] = _.merge({
                    _id: ObjectId(post.id),
                    refs: post.refs || 'users',
                    role: parseInt(post.role)
                },
                    _.pick(post, 'name', 'email')
                );


                let query = accessMergeTransform(owner, Entity.access, {_id}, Access.ROLE_ADMIN);
                query = formatNotEqual(query, `${Entity.access}._id`, access[Entity.access]._id);

                return DBRepository
                    .updateByPushUnique(query, access, Entity.access);
            });

        },

        updateRoles (_id, _idu, roles, owner) {

            return ClosurePromesify(() => {

                factoryValid(roles, accessValid.update);

                return AccessServices(Entity).deleteRoles(_id, _idu, owner)
                    .then(() => {
                        Object.assign(roles, {id: _idu});

                        return AccessServices(Entity).addRoles(_id, roles, owner);
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
