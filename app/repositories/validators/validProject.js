
import ValidFactory from './validFactory';

module.exports = function(vals) {

    let rules = (child) => {
        child('name').required().isString().isLength({min:2, max: 25});
        child('owner').required();
    };


    return ValidFactory(
        rules,
        vals,
        "Project validator error"
    );

};
