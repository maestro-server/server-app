'use strict';

const _ = require('lodash');

const DPersistenceServices = require('core/services/PersistenceServices');
const PersistenceApplication = require('core/applications/persistenceApplication');

const TemplateScheduler = require('../services/templateScheduler');
const jsonParser = require('core/applications/transforms/jsonParser');
const filterHooks = require('core/applications/transforms/filterHooks');
const notExist = require('core/applications/validator/validNotExist');

const SchedulerEvents = require('../services/schedulerEvents');


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

        findEvents(req, res, next) {
            const {query} = req;

            PersistenceServices(Entity)
                .findOne(req.params.id, req.user)
                .then(notExist)
                .then(SchedulerEvents(query)(PersistenceServices))
                .then(e => res.json(e))
                .catch(next);
        },

        createTemplate(req, res, next) {
            const template = TemplateScheduler().template(req.body);
            _.set(req, 'body', template);

            PersistenceApplication(Entity, PersistenceServices)
                .create(req, res, next);
        },

        remove (req, res, next) {
            const data = {
                crawling: true
            };

            PersistenceServices(Entity)
                .remove(req.params.id, req.user, data)
                .then(e => res.status(204).json(e))
                .catch(next);
        }
    };
};

module.exports = _.curry(ApplicationSchedulers);
