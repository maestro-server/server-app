'use strict'

function AccessError (message='conflict error') {
    this.name = 'AccessError'
    this.message = message;
}

AccessError.prototype = Error.prototype;

module.exports = AccessError;
