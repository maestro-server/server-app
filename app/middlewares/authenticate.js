
import middleAuth from '../helpers/auth_conector';

module.exports = function (res, req) {
    return middleAuth().authenticate();
    next();
};
