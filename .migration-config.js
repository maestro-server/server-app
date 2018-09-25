'use strict'
require('dotenv').config();

const dbpath = require('./app/core/libs/dbpath')();

module.exports = {
    "mongoAppDb": {
        "connectionString": 'mongodb://'+dbpath
    }
}
