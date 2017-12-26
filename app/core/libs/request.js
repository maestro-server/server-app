'use strict';

const axios = require('axios');

module.exports = (url, headers = {}) => {
  const timeout = process.env.MAESTRO_DISCOVERY_TIMEOUT || 10000;

  return axios.create({
    baseURL: url,
    timeout: timeout,
    headers
  });
};
