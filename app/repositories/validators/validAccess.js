'use strict';

const ValidFactory = require('./validFactory');

module.exports = function(vals) {

    let rules = (child) => {
        child('id').required().isString().isLength({min:12, max: 24});
        child('role').required().isString().isMatch(/^[1|3|7]$/);
        child('refs').required().isString().isMatch(/^users|architectures|applications|project|teams$/);
    };


    return ValidFactory(
        rules,
        vals,
        "Access Format validator error"
    );

};
