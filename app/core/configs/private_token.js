'use strict';

const jwt = require('jwt-simple');
const token = process.env.MAESTRO_SECRETJWT_PRIVATE || 'defaultSecretKeyPrivate';
const {name:app, version} = require('../../../package.json');

const genToken = () => {
    const body = {
        app,
        version,
        noauth: process.env.MAESTRO_NOAUTH || 'defaultSecretNoAuthToken'
    };
    const tk = jwt.encode(body, token);
    return `JWT ${tk}`;
}

module.exports.token = genToken();
