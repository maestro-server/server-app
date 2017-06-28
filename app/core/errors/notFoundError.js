'use strict';

function NotFoundError (errors, message='not found error') {
    this.name = 'NotFoundError';
    this.message = message;
    this.errors = errors;
}

NotFoundError.prototype = Error.prototype;

module.exports = NotFoundError;
