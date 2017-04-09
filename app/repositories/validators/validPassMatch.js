
const PermissionError = require('../../errors/permissionError');

module.exports = function(password, obj) {

    return new Promise((resolve) => {

      if(obj.passwordMatches(password)) {
        resolve(obj);
        return;
      }

      throw new PermissionError("Invalid username or password");

    });

};
