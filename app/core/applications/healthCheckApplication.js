'use strict';

const _ = require('lodash');
const Services = require('core/services/HTTPService');
const healthTransform = require('core/applications/transforms/healthTransform');
const {name:app, version, description} = require('../../../package.json');


const addServerService = (results) => {
    let cname = _.startCase(app);
    const status = 'UP';
    results.unshift({name: cname, version, description, status});
    return results;
}

const HealthCheck = () => {

    const handle_services = (Service) => {
        const {name} = Service;

        try {
            const srvc = Service();
            if(_.has(srvc, 'find'))
                return {
                    name,
                    'endpoint_caller': srvc.find('/')
                };
        }
        catch (e) {
            return {
                name,
                'endpoint_caller': new Promise((resolve) => resolve(e))
            };
        }

    };

    const abstract_catch = prs => prs.map(p => p.catch ? p.catch(e => e) : p);

    return {

        ping: (req, res, next) => {
            const checks = _.chain(Services)
                     .map(handle_services)
                     .filter()
                     .value();

            const prs = checks.map(e=>e.endpoint_caller);
            const names = checks.map(e=>e.name);

            return Promise.all(abstract_catch(prs))
                .then(healthTransform(names))
                .then(addServerService)
                .then(e => res.json(e))
                .catch(next);
        }

    };
};

module.exports = _.curry(HealthCheck);
