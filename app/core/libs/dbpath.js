'use strict';


module.exports = () => {
    return process.env.MAESTRO_MONGO_URI || 'mongodb://localhost';
};
