'use strict';

const HTTPService = require('core/services/HTTPService');
const {name:app, version, description} = require('../../../package.json');

module.exports = function (router) {

    router.get('/', function (req, res) {
      const bag = {
        'api_timeout': process.env.MAESTRO_TIMEOUT || 10000,
        'discovery_url': HTTPService.DiscoveryHTTPService({}).info(), 
        'reports_url': HTTPService.ReportHTTPService({}).info(),
        'analytics_url': HTTPService.AnalyticsHTTPService({}).info(), 
        'analytics_front_url': HTTPService.AnalyticsFrontHTTPService({}).info()
      }

      res.json(
        {
          app,
          description,
          version,
          ...bag
        });
    });
};
