'use strict'
require('dotenv').config();

module.exports = {
    "mongoAppDb": {
        "connectionString": 'mongodb://'+process.env.MAESTRO_MONGO_URI
    }
}
