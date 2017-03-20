import Validator from 'better-validator';
import ValidFactory from './validFactory';
import ValidationError from '../../errors/validatorError';

module.exports = function(vals) {

    let rules = (child) => {
        //child('').required().isNumber().integer(); // pass
        child('name').isString(); // fail
    };

    return ValidFactory(
        rules,
        vals,
        "User validator error"
    );

};
