
const ValidFactory = require('./validFactory');

module.exports = function(vals) {

    let rules = (child) => {
        child('email').required().isString().isEmail();
        child('callback_url').required().isString().isURL();
    };

    return ValidFactory(
        rules,
        vals,
        "Invalid error"
    );

};
