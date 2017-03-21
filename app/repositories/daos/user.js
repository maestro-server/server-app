'use strict';

import {Model} from 'mongorito';

class UserDao extends Model {

    collection () {
        return 'users';
    }

    static isDuplicate (email) {
        return UserDao.where('email', email).findOne();
    }

}

module.exports = UserDao;
