'use strict';

/*
hooks: {
  after_create: {
    systemHookEntryApp: {}
  }
},
*/

const _ = require('lodash');
const {AuditHTTPService} = require('core/services/HTTPService');

const systemHookEntryApp = ({}) => (data) => {

    console.log(data)
    return data;
};

module.exports = systemHookEntryApp;
