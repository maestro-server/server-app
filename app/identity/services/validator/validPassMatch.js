'use strict';

const PermissionError = require('core/errors/factoryError')('PermissionError');
const bcrypt = require('bcrypt');


module.exports = function(password, obj) {

    return new Promise((resolve) => {

        if(obj.hasOwnProperty('password')) {
            if(obj && bcrypt.compareSync(password, obj.password)) {
                resolve(obj);
                return;
            }
        }

      throw new PermissionError("Invalid username or password");

    });

};
