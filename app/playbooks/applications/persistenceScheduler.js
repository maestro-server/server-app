'use strict';

const _ = require('lodash');

const DPersistenceServices = require('core/services/PersistenceServices');
const PersistenceApplication = require('core/applications/persistenceApplication');

const TemplateScheduler = require('../services/templateScheduler');
const jsonParser = require('core/applications/transforms/jsonParser');
const filterHooks = require('core/applications/transforms/filterHooks');


const ApplicationSchedulers = (Entity, PersistenceServices = DPersistenceServices) => {

    return {
        find(req, res, next) {
            const field = 'query';
            let query = _.clone(req.query);

            query = jsonParser(query, field);

            query = filterHooks(query, field, [
                { dest: 'task', source: 'modules', module: 'swap' }
            ]);

            Object.assign(req, { query });
            PersistenceApplication(Entity, PersistenceServices)
                .find(req, res, next);
        },

        createTemplate(req, res, next) {
            const template = TemplateScheduler().template(req.body);
            _.set(req, 'body', template);

            PersistenceApplication(Entity, PersistenceServices)
                .create(req, res, next);
        }
    };
};

module.exports = _.curry(ApplicationSchedulers);
