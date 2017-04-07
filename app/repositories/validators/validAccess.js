
const ValidFactory = require('./validFactory');

module.exports = function(vals) {

    let rules = (child) => {
        child('id').required().isString().isLength({min:12, max: 24});
        child('role').isString();
    };


    return ValidFactory(
        rules,
        vals,
        "Access Format validator error"
    );

};
