
import PermissionError from '../../errors/PermissionError';

module.exports = function(password, obj) {

    return new Promise((resolve, reject) => {

      if(obj.passwordMatches(password)) {
        resolve(obj);
        return;
      }

      throw new PermissionError("Invalid username or password");

    });

};
