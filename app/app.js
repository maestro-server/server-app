'use strict';

import express from 'express';
import kraken from 'kraken-js';
import bodyParser from 'body-parser';

import db_connect from './helpers/db_connect';

/*
 * Create and configure application. Also exports application instance for use by tests.
 * See https://github.com/krakenjs/kraken-js#options for additional configuration options.
 */
let options = {
    onconfig: function (config, next) {
        /*
         * Add any additional config setup or overrides here. `config` is an initialized
         * `confit` (https://github.com/krakenjs/confit/) configuration object.
         */

        db_connect(); // connect with mongorito

        next(null, config);
    }
};

let app = module.exports = express();
app.use(kraken(options));


app.on('start', function () {
    console.log('Application ready to serve requests.');
    console.log('Environment: %s', app.kraken.get('env:env'));
});
