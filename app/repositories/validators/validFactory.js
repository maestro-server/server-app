const Validator = require('better-validator');
const ValidatorError = require('../../errors/validatorError');

module.exports = function (rulesValidade, vals, msg = "Validator error") {

    return new Promise(function (resolve) {
        const validator = new Validator();

        validator(vals).isObject(rulesValidade);

        const errors = validator.run();

        if (errors.length) {
            throw new ValidatorError(errors, msg);
        }

        resolve(vals);

    });

};
