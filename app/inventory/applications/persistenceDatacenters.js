'use strict';

const _ = require('lodash');
const DPersistenceServices = require('core/services/PersistenceServices');
const notExist = require('core/applications/validator/validNotExist');
const DatacenterOrphans = require('../services/DatacentersOrphans');
const DatacentersCreateAnalytics = require('../services/DatacentersCreateAnalytics');
const DatacentersAttachReports = require('../services/DatacentersAttachReports');

const ApplicationDatacenters = (Entity, PersistenceServices = DPersistenceServices) => {

    return {
              findOrphans(req, res, next) {

            PersistenceServices(Entity)
                .findOne(req.params.id, req.user)
                .then(notExist)
                .then(DatacenterOrphans(req)(PersistenceServices))
                .then(e => res.json(e))
                .catch(next);
        },

        createAnalytics(req, res, next) {

            PersistenceServices(Entity)
                .findOne(req.params.id, req.user)
                .then(notExist)
                .then(DatacentersCreateAnalytics(req)(PersistenceServices))
                .then(DatacentersAttachReports(req)(PersistenceServices))
                .then(e => res.json(e))
                .catch(next);
        }
    };
};

module.exports = _.curry(ApplicationDatacenters);
