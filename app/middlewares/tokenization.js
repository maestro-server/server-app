
const middleAuth = require('../helpers/auth_conector');

module.exports = function () {
    return middleAuth().initialize();
    next();
};
