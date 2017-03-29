
import middleAuth from '../helpers/auth_conector';

module.exports = function (req, res, next) {
    return middleAuth().authenticate();
    next();
};
