'use strict';

const _ = require('lodash');
const Scheduler = require('playbooks/entities/Scheduler');
const Access = require('core/entities/accessRole');

const aclRoles = require('core/applications/transforms/aclRoles');
const mapRelationToObjectID = require('core/applications/transforms/mapRelationToObjectID');
const TemplateScheduler = require('playbooks/services/templateScheduler');


const mapperBatchInsert = async (body, req, PersistenceServices) => {
    const template = await TemplateScheduler().template(body);

    const bodyWithOwner = Object.assign(
        {},
        mapRelationToObjectID(template, Scheduler.mapRelations),
        aclRoles(req.user, Scheduler, Access.ROLE_ADMIN)
    );

    return PersistenceServices(Scheduler).create(bodyWithOwner);
};


module.exports = mapperBatchInsert;
