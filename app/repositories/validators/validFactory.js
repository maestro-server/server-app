import Validator from 'better-validator';
import ValidationError from '../../errors/validatorError';

module.exports = function(rulesValidade, vals, msg="Validator error") {

    let promises = new Promise(function(resolve, reject) {

        const validator = new Validator();

        validator(vals).isObject(rulesValidade);

        const errors = validator.run();

        if(errors.length) {
            throw new ValidationError(errors, msg);
        }

        resolve();

    });

    return promises;

};
