import Validator from 'better-validator';
import ValidatorError from '../../errors/validatorError';

module.exports = function (rulesValidade, vals, msg = "Validator error") {

    return new Promise(function (resolve, reject) {
        const validator = new Validator();

        validator(vals).isObject(rulesValidade);

        const errors = validator.run();

        if (errors.length) {
            throw new ValidatorError(errors, msg);
        }

        resolve();

    });

};
