'use strict';

const co = require('co');

/*
 * Run a generator function and print errors if any
 */
module.exports =  function run (fn) {
    co(fn).catch(function (err) {
        console.error(err.stack);
    });
};
