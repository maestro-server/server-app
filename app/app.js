'use strict';

require('app-module-path').addPath(`${__dirname}/`); //make more realiable to call modules

const express = require('express');
const kraken = require('kraken-js');

const db_connect = require('core/libs/db_run');
const dbpath = require('core/libs/dbpath')();
const Mongorito = require('mongorito');

/*
 * Create and configure application. Also exports application instance for use by tests.
 * See https://github.com/krakenjs/kraken-js#options for additional configuration options.
 */
const options = {
    onconfig: function (config, next) {
        /*
         * Add any additional config setup or overrides here. `config` is an initialized
         * `confit` (https://github.com/krakenjs/confit/) configuration object.
         */

        db_connect(function *() {
            yield Mongorito.connect(dbpath);
            next(null, config);
            console.log("Maestro: Mongo online");
        });
    }
};

const app = module.exports = express();

app.use(kraken(options));


app.on('start', function () {
    console.log('Maestro: Application ready to serve requests. -- Environment: %s', app.kraken.get('env:env'));
});
