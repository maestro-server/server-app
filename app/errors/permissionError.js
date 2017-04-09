'use strict';

function PermissionError (message='permission error') {
    this.name = 'PermissionError';
    this.message = message;
}

PermissionError.prototype = Error.prototype;

module.exports = PermissionError;
