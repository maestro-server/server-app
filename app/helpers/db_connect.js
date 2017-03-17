'use strict';

import run from './db_run';
import Mongorito from 'mongorito';

/*
 * Run a generator function and print errors if any
 */
module.exports =  function connect() {
    run(function * () {
        yield Mongorito.connect(process.env.MONGO_URL);
        console.log('connecting DONE');
    });
};
