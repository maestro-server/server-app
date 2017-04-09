
/**
 * Library to hold crypto specific properties
 */
'use strict';

let crypto = function() {
    let cryptLevel = 6;
    this.getCryptLevel = function() {
        return cryptLevel;
    };
};

module.exports = new crypto();
