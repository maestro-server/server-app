'use strict';

const _ = require('lodash');

const Adminer = require('adminer/entities/Adminer');
const DPersistenceServices = require('core/services/PersistenceServices');
const aclRoles = require('core/applications/transforms/aclRoles');
const tokenGenerator = require('../transforms/tokenTransform');
const Access = require('core/entities/accessRole');
const notExist = require('core/applications/validator/validNotExist');
const validAccessEmpty = require('core/applications/validator/validAccessEmpty');
const DatacentersConnection = require('../services/DatacentersConnection');
const SchedulerBatch = require('../services/SchedulerBatchCreator');

const {DiscoveryHTTPService} = require('core/services/HTTPService');

const ApplicationDatacenters = (Entity, PersistenceServices = DPersistenceServices) => {

    return {
        findOrphans(req, res, next) {
           
        }
    };
};

module.exports = _.curry(ApplicationDatacenters);
