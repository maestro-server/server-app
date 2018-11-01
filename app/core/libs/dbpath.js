'use strict';


module.exports = () => {
    const uri = process.env.MAESTRO_MONGO_URI || 'localhost';
    const db = process.env.MAESTRO_MONGO_DATABASE || 'maestro-client';
    return `${uri}/${db}`;
};