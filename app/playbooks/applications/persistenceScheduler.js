'use strict';

const _ = require('lodash');

const DPersistenceServices = require('core/services/PersistenceServices');
const PersistenceApplication = require('core/applications/persistenceApplication');

const jsonParser = require('core/applications/transforms/jsonParser');
const filterHooks = require('core/applications/transforms/filterHooks');
const TemplateScheduler = require('../services/templateScheduler');

const ApplicationSchedulers = (Entity, PersistenceServices = DPersistenceServices) => {

  return {
    find(req, res, next) {
      const field = 'query';
      let query = _.clone(req.query);

      query = jsonParser(query, field);

      query = filterHooks(query, field, [
        { dest: 'link.refs', source: 'modules', module: 'swap' }
      ]);

      Object.assign(req, { query });
      PersistenceApplication(Entity, PersistenceServices)
        .find(req, res, next);
    },

    createTemplate(req, res, next) {
      const template = TemplateScheduler(req).template(req.body);
      _.set(req, 'body', template);
      console.log(template);

      PersistenceApplication(Entity, PersistenceServices)
        .create(req, res, next);
    }
  };
};

module.exports = _.curry(ApplicationSchedulers);
