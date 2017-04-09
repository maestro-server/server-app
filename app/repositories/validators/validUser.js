'use strict';

const ValidFactory = require('./validFactory');

module.exports = function(vals) {

    let rules = (child) => {
        child('name').isString().isLength({min:3, max: 25});
        child('email').isString().isEmail();
    };


    return ValidFactory(
        rules,
        vals,
        "User validator error"
    );

};
