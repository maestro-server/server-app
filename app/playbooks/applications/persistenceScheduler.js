'use strict';

const _ = require('lodash');

const DPersistenceServices = require('core/services/PersistenceServices');
const PersistenceApplication = require('core/applications/persistenceApplication');

const TemplateScheduler = require('../services/templateScheduler');

const ApplicationSchedulers = (Entity, PersistenceServices = DPersistenceServices) => {

    return {
        createTemplate(req, res, next) {
            const template = TemplateScheduler().template(req.body);
            _.set(req, 'body', template);

            PersistenceApplication(Entity, PersistenceServices)
                .create(req, res, next);
        }
    };
};

module.exports = _.curry(ApplicationSchedulers);
