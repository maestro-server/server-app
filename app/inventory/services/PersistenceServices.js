'use strict';

const _ = require('lodash');

const DFactoryDBRepository = require('core/repositories/DBRepository');

const Access = require('core/entities/accessRole');
const accessMergeTransform = require('core/services/transforms/accessMergeTransform');

const Persistence = (Entity, FactoryDBRepository = DFactoryDBRepository) => {

    const DBRepository = FactoryDBRepository(Entity, {oUpdater: 'Many'});

    return {
        addList(_id, post, owner, access = Access.ROLE_READ) {

            return new Promise((resolve, reject) => {

                const prepared = _.assign({},
                    accessMergeTransform(owner, Entity.access, {_id}, access)
                );

                return DBRepository
                    .updateByPushUnique(prepared, post)
                    .then(resolve)
                    .catch(reject);
            });

        },

        removeList(_id, post, owner, access = Access.ROLE_WRITE) {

            return new Promise((resolve, reject) => {

                const prepared = _.assign({},
                    accessMergeTransform(owner, Entity.access, {_id}, access)
                );

                return DBRepository
                    .updateByPull(prepared, post)
                    .then(resolve)
                    .catch(reject);
            });

        }


    };
};

module.exports = _.curry(Persistence);
