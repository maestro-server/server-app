'use strict';

/*
hooks: {
  after_create: {
    auditHookPatched: {
        entity: 'servers',
        fill: filled //array with allowed fields
    }
  }
},
*/

const _ = require('lodash');
const {AuditHTTPService} = require('core/services/HTTPService');

const auditHookPatched = ({entity, fill}) => (data) => {
    const cleandata = _.pick(data, fill);

    AuditHTTPService()
        .patch(`/audit/${entity}/${data['_id']}`, cleandata)
        .catch(console.error);


    return data;
};

module.exports = auditHookPatched;
