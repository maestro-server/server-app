'use strict';

import Dao from './dao';
import bcrypt from 'bcrypt';
import crypto from '../../helpers/crypto';

import {Model} from 'mongorito';

class UserDao extends Dao {

    collection () {
        return 'users';
    }

    configure () {
      super.configure();
      this.before('create', 'passHash');
    }

    passHash () {
        this.attributes.password = bcrypt.hashSync(this.attributes.password, crypto.getCryptLevel());
    }

    static isDuplicate (email) {
        return UserDao.where('email', email).findOne();
    }

}

module.exports = UserDao;
