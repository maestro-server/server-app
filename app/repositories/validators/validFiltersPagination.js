
const ValidFactory = require('./validFactory');


module.exports = function(vals) {

    let rules = (child) => {
        child('city').isString();
    };

    return ValidFactory(
        rules,
        vals,
        "Filters validator error"
    );

};
