'use strict';

import run from './db_run';
import Mongorito from 'mongorito';

/*
 * Run a generator function and print errors if any
 */
module.exports =  function disconnect() {
    run(function * () {
        yield Mongorito.disconnect();
        console.log('disconnected');
    });
};
