'use strict';

module.exports = (key, href, method = "GET") => ({[key]: {href, method}});
