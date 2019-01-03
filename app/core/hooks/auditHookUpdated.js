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
        .update(`/audit/${entity}/${data['_id']}/${_.get(data, 'user.email', '?')}`, cleandata)
        .catch(console.error);

    return data;
};

module.exports = auditHookUpdated;
