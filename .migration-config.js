'use strict'
require('dotenv').config();

const url = process.env.MAESTRO_MONGO_URI || 'localhost/maestro-client'


module.exports = {
    "mongoAppDb": {
        "connectionString": 'mongodb://'+url
    }
}
