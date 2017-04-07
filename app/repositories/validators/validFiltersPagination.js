
const Validator = require('better-validator');
const ValidFactory = require('./validFactory');
const ValidationError = require('../../errors/validatorError');

const UserDao = require('../daos/user');


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
