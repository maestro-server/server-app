'use strict';

const _ = require('lodash');
const Access = require('core/entities/accessRole');
const DFactoryDBRepository = require('core/repositories/DBRepository');
const accessMergeTransform = require('core/services/transforms/accessMergeTransform');
const Scheduler = require('playbooks/entities/Scheduler');
const in_maker = require('core/libs/in_maker');

const SchedulerBatch = (req) => (PersistenceServices, FactoryDBRepository = DFactoryDBRepository) => {

    const DBRepository = FactoryDBRepository(Scheduler, {oUpdater: 'Many'});

    return {
        batch(access = Access.ROLE_WRITE) {
            const filters = {
                'link._id': in_maker(req.params.id)
            };

            const prepared = accessMergeTransform(req.user, Scheduler.access, filters, access);

            const crawling = true
            return DBRepository
                .remove(prepared, {crawling});
        }
    };
};

module.exports = SchedulerBatch;
