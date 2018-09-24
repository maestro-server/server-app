'use strict'
require('dotenv').config();

const dbpath = require('core/libs/dbpath')();

module.exports = {
    "mongoAppDb": {
        "connectionString": 'mongodb://'+dbpath
    }
}
