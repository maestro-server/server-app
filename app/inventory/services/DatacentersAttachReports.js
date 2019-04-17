'use strict';

const _ = require('lodash');
const Datacenter = require('inventory/entities/Datacenter');
const Scheduler = require('reports/entities/Scheduler');
const accessMergeTransform = require('core/services/transforms/accessMergeTransform');
const DFactoryDBRepository = require('core/repositories/DBRepository');

const createTemplate = ({name, _id}, user) => {
    return {
        "name": `DC - ${name}`,
        "method": "PATCH",
        "enabled": true,
        "period_type": "interval",
        "task": "reports",
        "run_immediately": true,
        'source': "report",
        "interval":{"period":"days","every":"1"},
        "endpoint": "reports/general",
        "link":{
            "_id":_id,
            "report":"general",
            "name":name
        },
        "args":[{"key":"report_id","value":_id},{"key":"owner_user","value":user._id}]
    };
};

const DatacentersAttachReports = (req) => (PersistenceServices, FactoryDBRepository = DFactoryDBRepository) => (data) => {
    let {user, params} = req;
    const {id} = params;

    const reports = _.map(data, (item) => _.pick(item, ['_id', 'component', 'name']));
    const prepared = accessMergeTransform(user, Datacenter.access, {_id: id});
    const DBRepositoryDatacenter = FactoryDBRepository(Datacenter, {ignoreValid: true});
    
    let bags = [];
    bags.push(DBRepositoryDatacenter.patch(prepared, {reports}, ['reports']));

    _.forEach(reports, (item) => {
        const body = createTemplate(item, user);
        bags.push(PersistenceServices(Scheduler, user).create(body));
    });

    return Promise.all(bags);
};


module.exports = DatacentersAttachReports;
