'use strict';

const _ = require('lodash');
const Datacenter = require('inventory/entities/Datacenter');
const accessMergeTransform = require('core/services/transforms/accessMergeTransform');
const DFactoryDBRepository = require('core/repositories/DBRepository');

const DatacentersAttachReports = (req) => (FactoryDBRepository = DFactoryDBRepository) => (data) => {
    let {user, params} = req;
    const {id} = params;

    const reports = _.map(data, (item) => _.pick(item, ['_id', 'component']));
    const prepared = accessMergeTransform(user, Datacenter.access, {_id: id});
    const DBRepository = FactoryDBRepository(Datacenter, {ignoreValid: true});
    return DBRepository.patch(prepared, {reports}, ['reports']);
};

module.exports = DatacentersAttachReports;
