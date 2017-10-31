'use strict';

const _ = require('lodash/fp');
const Connector = require('../libs/request')

const HTTPService = (url) => (header = {}) => {

    return {
        find(path, args = {}) {
            return new Promise((resolve, reject) => {
                return Connector(url, header)
                    .get(path, args)
                    .then(_.get('data'))
                    .then(resolve)
                    .catch(reject);
            });
        }
    };
};

const DiscoveryHTTPService = (header = {}) => {
    const url = process.env.DISCOVERY_URL;
    return HTTPService(url)(header);
}

module.exports = {
    HTTPService,
    DiscoveryHTTPService
};
