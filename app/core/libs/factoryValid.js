"use strict";

const Joi = require('joi');
const ValidatorError = require('core/errors/factoryError')('ValidatorError');

module.exports = (post, scheme, msg = "Validator error") => {

    const valid = Joi.validate(post, scheme);

    if (valid.error) {
        throw new ValidatorError(valid.error.details, msg);
    }

    return true;
};
