'use strict';

const PermissionError = require('core/errors/permissionError');
const bcrypt = require('bcrypt');


module.exports = function(password, obj) {

    return new Promise((resolve) => {

      if(obj && bcrypt.compareSync(password, obj.password)) {
        resolve(obj);
        return;
      }

      throw new PermissionError("Invalid username or password");

    });

};
