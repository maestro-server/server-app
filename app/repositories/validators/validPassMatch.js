
import AccessError from '../../errors/accessError';

module.exports = function(password, obj) {

    return new Promise((resolve, reject) => {

      if(obj.passwordMatches(password)) {
        resolve(obj);
        return;
      }

      throw new AccessError("Invalid username or password");

    });

};
