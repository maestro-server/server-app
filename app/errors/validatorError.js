'use strict'

function ValidatorError (errors, message='validator error') {
    this.name = 'ValidatorError'
    this.message = message;
    this.errors = errors;
}

ValidatorError.prototype = Error.prototype;

module.exports = ValidatorError;
