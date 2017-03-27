
import run from '../../helpers/db_run';

import UserDao from '../daos/user';
import ConflictError from '../../errors/conflictError';

module.exports = function(vals) {

    return new Promise((resolve, reject) => {

      UserDao.isDuplicate(vals.email)
      .then(result => {

        if(result instanceof Object) {
            const err = {error: {failed: "user already"}};
            let errors = [{failed:vals.email}];
            throw new ConflictError(errors, "User already exist");
        }

        resolve(vals);
      })
      .catch(e => {
        reject(e);
      });

    });


};
