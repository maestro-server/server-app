
import Validator from 'better-validator';
import ValidFactory from './validFactory';
import ValidationError from '../../errors/validatorError';

import UserDao from '../daos/user';


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
