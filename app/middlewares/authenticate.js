
const middleAuth = require('../helpers/auth_conector');

module.exports = function (req, res, next) {
    return middleAuth().authenticate();
    next();
};
