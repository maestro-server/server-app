'use strict';

/*
 * Load .env
 */
require('dotenv').config();


let app = require('./app/app');
let http = require('http');

let server;

/*
 * Create and start HTTP server.
 */
process.env.MAESTRO_PORT = process.env.MAESTRO_PORT || 8888;

server = http.createServer(app);
server.listen(process.env.MAESTRO_PORT);
server.on('listening', function () {
    console.log('Maestro: Server listening on //localhost:%d', this.address().port);
});