'use strict';

const middleAuth = require('identity/profile/config/auth_conector');

module.exports = function () {
    return middleAuth().authenticate();
};
