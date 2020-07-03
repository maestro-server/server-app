'use strict';

const privateAuth = require('identity/config/auth_conector_private');

module.exports = function () {
    return privateAuth().authenticate();
};
