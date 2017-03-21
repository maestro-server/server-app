
import run from '../../helpers/db_run';
import co from 'co';

import UserDao from '../daos/user';
import ConflictError from '../../errors/conflictError';

module.exports = function(val) {

    let promises = new Promise((resolve, reject) => {

      UserDao.isDuplicate(val)
      .then(result => {

        if(result instanceof Object) {
            const err = {error: {failed: "user already"}};
            let errors = [{failed:val}];
            throw new ConflictError(errors, "User already exist");
        }

        resolve();
      })
      .catch(e => {
        reject(e);
      });

    });

    return promises;

};
