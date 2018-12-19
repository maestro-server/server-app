'use strict';

/*
hooks: {
  after_create: {
    auditHookDeleted: {
        entity: 'servers',
        fill: filled //array with allowed fields
    }
  }
},
*/

const _ = require('lodash');
const {AuditHTTPService} = require('core/services/HTTPService');

const auditHookDeleted = ({entity}) => (data) => {

    AuditHTTPService()
        .remove(`/audit/${entity}/${data['_id']}`)
        .catch(console.error);

    return data;
};

module.exports = auditHookDeleted;
