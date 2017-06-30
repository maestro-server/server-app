'use strict';

const middleAuth = require('profile/config/auth_conector');

module.exports = function () {
    return middleAuth().authenticate();
};
