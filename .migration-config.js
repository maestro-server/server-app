'use strict'
require('dotenv').config();

const uri = process.env.MAESTRO_MONGO_URI || 'mongodb://localhost';
const db = process.env.MAESTRO_MONGO_DATABASE || 'maestro-client';

module.exports = {
    "mongoAppDb": {
        "connectionString": uri,
        "database": db,
        "strOpts":
            {
                useUnifiedTopology: true,
                useNewUrlParser: true
            }
    }
}
