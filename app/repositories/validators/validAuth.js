
import ValidFactory from './validFactory';

module.exports = function(vals) {

    let rules = (child) => {
        child('email').required().isString().isEmail();
        child('password').required().isString().isLength({min:4, max: 25});
    };

    return ValidFactory(
        rules,
        vals,
        "Auth validator error"
    );

};
