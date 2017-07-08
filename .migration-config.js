'use strict'
require('dotenv').config();

module.exports = {
    "mongoAppDb": {
        "connectionString": 'mongodb://'+process.env.MONGO_URL
    }
}
