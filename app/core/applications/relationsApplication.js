'use strict';

const _ = require('lodash');

const DRelationsSyncerService = require('core/services/RelationsSyncerService');
const DFactoryPesistenceApp = require('core/applications/persistenceApplication');


const RelationsApp = (Entity) => (REntity) => (RelationsSyncerService = DRelationsSyncerService)  => (FactoryPesistenceApp = DFactoryPesistenceApp) => {

    return {
        find: (req, res, next) => {
          req.query[`${Entity.name}._id`] = _.get(req, 'params.id');

          FactoryPesistenceApp(REntity)
              .find(req, res, next);
        },

        count: (req, res, next) => {
          req.query[`${Entity.name}._id`] = _.get(req, 'params.id');

          FactoryPesistenceApp(REntity)
              .count(req, res, next);
        },

        syncer: (req, res, next) => {
            const source = 'params.id';

            RelationsSyncerService(Entity)(REntity)
                .syncer(req, req.user, source)
                .then(e => res.json(e))
                .catch(next);
        }

    };
};

module.exports = RelationsApp;
