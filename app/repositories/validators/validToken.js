
import ValidFactory from './validFactory';

module.exports = function(vals) {

    let rules = (child) => {
        child('token').required().isString();
        child('password').required().isString();
    };

    return ValidFactory(
        rules,
        vals,
        "Invalid token"
    );

};