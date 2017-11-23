
/**
 * Library to hold crypto specific properties
 */
'use strict';

const crypto = require("crypto");

const CIPHER = process.env.MAESTRO_SECRET_CRYPTO_FORGOT || "dsfsdfsd43";

const factoryCrypto = function() {
    const cryptLevel = 6;
    this.getCryptLevel = function() {
        return cryptLevel;
    };
};

module.exports = new factoryCrypto();

module.exports.encrypt = function(text){
    const cipher = crypto.createCipher('aes-256-cbc', CIPHER);
    const crypted = cipher.update(text,'utf8','hex') + cipher.final('hex');
    return crypted;
};

module.exports.decrypt = function(text){
    const decipher = crypto.createDecipher('aes-256-cbc', CIPHER);
    const dec = decipher.update(text,'hex','utf8') + decipher.final('utf8');
    return dec;
};
