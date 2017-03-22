
import ValidFactory from './validFactory';

module.exports = function(vals) {

    let rules = (child) => {
        child('name').required().isString().isLength({min:4, max: 25});
        child('email').required().isString().isEmail();
        child('password').required().isString().isLength({min:4, max: 25});
    };

    return ValidFactory(
        rules,
        vals,
        "User validator error"
    );

};
