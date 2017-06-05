'use strict';

function ConflictError (errors, message='conflict error') {
    this.name = 'ConflictError';
    this.message = message;
    this.errors = errors;
}

ConflictError.prototype = Error.prototype;

module.exports = ConflictError;
