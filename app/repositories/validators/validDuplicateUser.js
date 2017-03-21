
import run from '../../helpers/db_run';
import co from 'co';

import UserDao from '../daos/user';
import ConflictError from '../../errors/conflictError';

module.exports = function(val) {

    let promises = new Promise((resolve, reject) => {

        throw new Error("dsfs");

    });

    return promises;
    /*

    let promises = new Promise(async function(resolve, reject) {

        reject();
        return;
        let result = await UserDao.isDuplicate(val);

        if(result instanceof Object) {
            const err = {error: {failed: "user already"}};
            throw new Error();
        }


    });

    return promises;
*/
};
