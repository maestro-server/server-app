'use strict';

const Scheduler = require('playbooks/entities/Scheduler');
const Access = require('core/entities/accessRole');

const aclRoles = require('core/applications/transforms/aclRoles');
const mapRelationToObjectID = require('core/applications/transforms/mapRelationToObjectID');
const TemplateScheduler = require('playbooks/services/templateScheduler');


const mapperBatchInsert = async (body, req, PersistenceServices) => {
    let template = [];

    try {
        template = await TemplateScheduler().template(body);
    } catch(e) {
        console.log(e);
    }


    const bodyWithOwner = Object.assign(
        {},
        mapRelationToObjectID(template, Scheduler.mapRelations),
        aclRoles(req.user, Scheduler, Access.ROLE_ADMIN)
    );

    return PersistenceServices(Scheduler).create(bodyWithOwner);
};


module.exports = mapperBatchInsert;
