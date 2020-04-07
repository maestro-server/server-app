'use strict';

const _ = require('lodash/fp');
const Connector = require('../libs/request');
const privateToken = require('core/configs/private_token.js');
const HTTPError = require('core/errors/factoryError')('HTTPError');
const ServiceDisabledError = require('core/errors/factoryError')('ServiceDisabledError');

const HTTPService = (url) => (header = {}) => {

    Object.assign(header, {Authorization: privateToken.token}); // inject private token, used to autheticate on private services

    const factoryRequest = (caller, path, args) => {
        return new Promise((resolve, reject) => {
            return Connector(url, header)[caller](path, args)
                .then(_.get('data'))
                .then(resolve)
                .catch(e=>{
                    if (e.response) {
                        if(e.response.data.message) {
                            const str = _.reduce((result, value) => result = `${result} ${value}`, '')(e.response.data.message);
                            reject(HTTPError(str));
                        }

                        if(_.has(e.response.data, 'errors'))
                            reject(HTTPError(e.response.data.errors));

                        if(_.has(e.response.data, 'error'))
                            reject(HTTPError(e.response.data.error));
                    }

                    reject(HTTPError(e.toString()));
                });
        });
    };

    return {
        info() {
            return {url, ...header};
        },

        find(path, args = {}) {
            return factoryRequest('get', path, args);
        },

        create(path, args = {}) {
            return factoryRequest('post', path, args);
        },

        patch(path, args = {}) {
            return factoryRequest('patch', path, args);
        },

        update(path, args = {}) {
            return factoryRequest('put', path, args);
        },

        remove(path, args = {}) {
            return factoryRequest('delete', path, args);
        }
    };
};


const get_url = (name, dft) => process.env[`MAESTRO_${name}_URI`] || dft;
const get_enabled = (name) => process.env[`MAESTRO_${name}_DISABLED`] || false;

const service_disabled = (name) => {
    const enabled = get_enabled(name);
    if (enabled)
        throw new ServiceDisabledError(`${name} service was disabled`);
};

const DiscoveryHTTPService = (header = {}) => {
    const name = 'DISCOVERY';
    service_disabled(name);

    const url = get_url(name, 'http://localhost:5000');
    return HTTPService(url)(header);
};

const ReportHTTPService = (header = {}) => {
    const name = 'REPORT';
    service_disabled(name);

    const url = get_url(name, 'http://localhost:5005');
    return HTTPService(url)(header);
};

const AnalyticsHTTPService = (header = {}) => {
    const name = 'ANALYTICS';
    service_disabled(name);

    const url = get_url(name, 'http://localhost:5020');
    return HTTPService(url)(header);
};

const AuditHTTPService = (header = {}) => {
    const name = 'AUDIT';
    service_disabled(name);

    const url = get_url(name, 'http://localhost:10900');
    return HTTPService(url)(header);
};

module.exports = {
    HTTPService,
    DiscoveryHTTPService,
    ReportHTTPService,
    AnalyticsHTTPService,
    AuditHTTPService
};
