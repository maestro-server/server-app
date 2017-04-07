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
process.env.PORT = process.env.PORT || 8000;

server = http.createServer(app);
server.listen(process.env.PORT);
server.on('listening', function () {
    console.log('Server listening on http://localhost:%d', this.address().port);
});
