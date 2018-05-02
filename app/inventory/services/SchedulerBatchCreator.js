'use strict';

const _ = require('lodash');
const Scheduler = require('playbooks/entities/Scheduler');
const Access = require('core/entities/accessRole');

const aclRoles = require('core/applications/transforms/aclRoles');
const mapRelationToObjectID = require('core/applications/transforms/mapRelationToObjectID');
const TemplateScheduler = require('playbooks/services/templateScheduler');


const mapperBatchInsert = (body, req, PersistenceServices) => {
    const template = TemplateScheduler().template(body);

    const bodyWithOwner = Object.assign(
        {},
        mapRelationToObjectID(template, Scheduler.mapRelations),
        aclRoles(req.user, Scheduler, Access.ROLE_ADMIN)
    );

    return PersistenceServices(Scheduler).create(bodyWithOwner);
};

const SchedulerBatch = (req) => (PersistenceServices) => {

    return {
        batch(result) {
            const {provider, _id, name} = result[0]

            const conducter = _.chain(result[2])
                .head()
                .head()
                .get('value.permissions')
                .get(provider)
                .mapValues(e => _.get(e, '[0].init_job'))
                .reduce((arr, value, key) => {
                    if(value)
                        arr.push(key);
                    return arr;
                }, [])
                .map(task => {
                    const refs = 'connections';
                    const body = {name, _id, provider, task, refs};
                    return mapperBatchInsert(body, req, PersistenceServices);
                })
                .value();


            return Promise.all(conducter);
        }
    };
};

module.exports = SchedulerBatch;
