'use strict';

require('app-module-path').addPath(`${__dirname}/`); //make more realiable to call modules

const express = require('express');
const kraken = require('kraken-js');

const db_connect = require('core/helpers/db_run');
const Mongorito = require('mongorito');
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

        db_connect(function *() {
            yield Mongorito.connect(process.env.MONGO_URL);
            next(null, config);
            console.log("Mongo online");
        });
    }
};

let app = module.exports = express();

app.use(kraken(options));


app.on('start', function () {
    console.log('Application ready to serve requests.');
    console.log('Environment: %s', app.kraken.get('env:env'));
});
