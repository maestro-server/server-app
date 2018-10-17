'use strict';

const _ = require('lodash');

const DFactoryPesistenceApp = require('core/applications/persistenceApplication');

const RelationsApp = ()  => (FactoryPesistenceApp = DFactoryPesistenceApp) => (REntity) => (Entity) => {

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
        }

    };
};

module.exports = RelationsApp;
