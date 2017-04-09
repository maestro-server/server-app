'use strict';

const ValidFactory = require('./validFactory');

module.exports = function(vals) {

    let rules = (child) => {
        child('name').required().isString().isLength({min:2, max: 25});
    };


    return ValidFactory(
        rules,
        vals,
        "Architecture validator error"
    );

};
