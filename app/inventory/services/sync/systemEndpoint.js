'use strict';

const _ = require('lodash');
const System = require('../../entities/System');
const Access = require('core/entities/accessRole');
const DFactoryDBRepository = require('core/repositories/DBRepository');
const accessMergeTransform = require('core/services/transforms/accessMergeTransform');


const systemUpdate = (systems, owner, FactoryDBRepository = DFactoryDBRepository) => (Entity = System,  access = Access.ROLE_WRITER) => {

    const DBRepository = FactoryDBRepository(Entity, {ignoreValid: true});

    return {
        addEndpoint(entry) {

            const bags = [];
            _.forEach(systems, (system) => {

                const {_id} = system;
                const prepared = accessMergeTransform(owner, Entity.access, {_id}, access);

                const prom = DBRepository
                    .patch(prepared, {entry}, ['entry'])
                    .catch(console.error);
                bags.push(prom);
            });

            return bags;
        }
    };
};


module.exports = systemUpdate;
