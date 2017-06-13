'use strict';

const middleAuth = require('core/helpers/auth_conector');

module.exports = function () {
    return middleAuth().authenticate();
};
