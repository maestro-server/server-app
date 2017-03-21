'use strict';

import {Model} from 'mongorito';

class UserDao extends Model {

    collection () {
        return 'users';
    }

    configure () {
        this.before('create', 'passHash');
    }

    *passHash (next) {
      console.log(this);

      yield next;
    }

    static isDuplicate (email) {
        return UserDao.where('email', email).findOne();
    }

}

module.exports = UserDao;
