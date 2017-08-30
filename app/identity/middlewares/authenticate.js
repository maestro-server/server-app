'use strict';

const middleAuth = require('identity/config/auth_conector');

module.exports = function () {
    return middleAuth().authenticate();
};
