'use strict';

const FactoryError = (name) => function(errors, msg='error') {
    const err = Error.call(this, msg);
    err.name = name;
    err.errors = errors;
    return err;
};

FactoryError.prototype = Object.create(Error.prototype, {
    constructor: { value: FactoryError }
});

module.exports = FactoryError;
