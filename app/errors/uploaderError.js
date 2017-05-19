'use strict';

function UploaderError (errors, message='upload error') {
    this.name = 'UploaderError';
    this.message = message;
    this.errors = errors;
}

UploaderError.prototype = Error.prototype;

module.exports = UploaderError;
