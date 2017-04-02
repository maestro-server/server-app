
import ValidFactory from './validFactory';

module.exports = function(vals) {

    let rules = (child) => {
        child('name').required().isString().isLength({min:2, max: 25});
        child('email').isString().isEmail();
        child('url').isString().isURL();
        child('avatar').isString().isURL();
    };


    return ValidFactory(
        rules,
        vals,
        "Team validator error"
    );

};
