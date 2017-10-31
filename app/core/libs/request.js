'use strict'

const axios = require('axios');

module.exports = (url, headers = {}) => {
  const timeout = process.env.DISCOVERY_TIMEOUT || 1000;

  return axios.create({
    baseURL: url,
    timeout: timeout,
    headers
  });
}
