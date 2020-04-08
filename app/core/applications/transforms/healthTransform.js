'use strict';

const _ = require('lodash');

const healthJsonMaker = (service, result) => {
    const name = service.replace('HTTPService', '');

    let robj = {
        name,
        'object': service,
    };

    if(_.get(result, 'name', '').indexOf('Error') > -1) {
        _.set(robj, 'message', result['errors']);
        _.set(robj, 'status', 'DOWN');
    } else {
        _.set(robj, 'message', _.get(result, 'description'));
        _.set(robj, 'version', _.get(result, 'version'));
        _.set(robj, 'license', _.get(result, 'license'));
        _.set(robj, 'status', 'UP');
    }

    return robj;
}
const healthTransforms = (services) => (results) => {
    return new Promise((resolve) => {
        let json = [];

        Object.keys(results).forEach((k) => {
            json.push(healthJsonMaker(services[k], results[k]));
        });

        resolve(json);
    });
};

module.exports = healthTransforms;
