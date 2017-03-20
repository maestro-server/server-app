'use strict'

function ValidationError (errors, message='validator error') {
    this.name = 'ValidationError'
    this.message = message;
    this.errors = errors;
}

ValidationError.prototype = Error.prototype;

module.exports = ValidationError;
