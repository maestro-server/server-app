'use strict';

/*
hooks: {
  after_create: {
    auditHookUpdated: {
        entity: 'servers',
        fill: filled //array with allowed fields
    }
  }
},
*/

const _ = require('lodash');
const {AuditHTTPService} = require('core/services/HTTPService');

const auditHookUpdated = ({entity, fill}) => (data) => {
    const cleandata = _.pick(data, fill);

    AuditHTTPService()
        .create(`/audit/${entity}/${data['_id']}`, cleandata)
        .catch(console.error);

    return data;
};

module.exports = auditHookUpdated;
