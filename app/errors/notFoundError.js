'use strict'

function NotFoundError (message='not found error') {
    this.name = 'NotFoundError';
    this.message = message;
}

NotFoundError.prototype = Error.prototype;

module.exports = NotFoundError;
