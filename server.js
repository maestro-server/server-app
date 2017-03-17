'use strict';

/*
 * Load .env
 */
require('dotenv').config();



/*
 * Babel hook
 */
require('babel-core/register');
require("babel-polyfill");


let app = require('./app/app');
let http = require('http');

let server;

/*
 * Create and start HTTP server.
 */

server = http.createServer(app);
server.listen(process.env.PORT || 8000);
server.on('listening', function () {
    console.log('Server listening on http://localhost:%d', this.address().port);
});
