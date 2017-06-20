
/**
 * Library to hold crypto specific properties
 */
'use strict';

const crypto = require("crypto");

const CIPHER = process.env.SECRET_CRYPTO_FORGOT || "dsfsdfsd43";

const factoryCrypto = function() {
    let cryptLevel = 6;
    this.getCryptLevel = function() {
        return cryptLevel;
    };
};

module.exports = new factoryCrypto();

module.exports.encrypt = function(text){
    let cipher = crypto.createCipher('aes-256-cbc', CIPHER);
    let crypted = cipher.update(text,'utf8','hex');
    crypted += cipher.final('hex');
    return crypted;
};

module.exports.decrypt = function(text){
    let decipher = crypto.createDecipher('aes-256-cbc', CIPHER);
    let dec = decipher.update(text,'hex','utf8');
    dec += decipher.final('utf8');
    return dec;
};
