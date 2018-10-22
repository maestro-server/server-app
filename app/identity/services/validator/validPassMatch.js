'use strict';

const PermissionError = require('core/errors/factoryError')('PermissionError');
const bcrypt = require('bcrypt');


module.exports = (password) => (obj) => {

    if(obj.hasOwnProperty('password')) {
        if(obj && bcrypt.compareSync(password, obj.password)) {
            return obj;
        }
    }

    throw new PermissionError("Invalid username or password");

};
