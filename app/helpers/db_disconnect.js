'use strict';

const run = require('./db_run');
const Mongorito = require('mongorito');

/*
 * Run a generator function and print errors if any
 */
module.exports =  function disconnect() {
    run(function * () {
        yield Mongorito.disconnect();
        console.log('disconnected');
    });
};
