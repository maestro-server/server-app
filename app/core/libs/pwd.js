
/**
 * Library to hold crypto specific properties
 */
'use strict';

module.exports = () => process.env.MAESTRO_TMP ? process.env.MAESTRO_TMP : process.cwd();
