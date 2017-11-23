'use strict';

const _ = require('lodash/fp');
const Connector = require('../libs/request');

const HTTPError = require('core/errors/factoryError')('HTTPError');

const HTTPService = (url) => (header = {}) => {

    const factoryRequest = (caller, path, args) => {
        return new Promise((resolve, reject) => {
            return Connector(url, header)[caller](path, args)
                .then(_.get('data'))
                .then(resolve)
                .catch(e=>{
                    if (e.response) {
                        reject(HTTPError(e.response.data.error));
                    } else {
                        reject(HTTPError(e.toString()));
                    }
                });
        });
    }

    return {
        find(path, args = {}) {
            return factoryRequest('get', path, args);
        },

        create(path, args = {}) {
            return factoryRequest('post', path, args);
        },

        update(path, args = {}) {
            return factoryRequest('put', path, args);
        },

        remove(path, args = {}) {
            return factoryRequest('delete', path, args);
        }
    };
};

const DiscoveryHTTPService = (header = {}) => {
    const url = process.env.MAESTRO_DISCOVERY_URL || 'http://localhost:5000';
    return HTTPService(url)(header);
}

module.exports = {
    HTTPService,
    DiscoveryHTTPService
};
