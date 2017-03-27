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
        this.attributes.password = UserDao.makeHash(this.get('password'));
    }

    passwordMatches (matcher) {
        return bcrypt.compareSync(matcher, this.get('password'));
    }

    static makeHash (string) {
        return bcrypt.hashSync(string, crypto.getCryptLevel());
    }

    static isDuplicate (email) {
        return UserDao.where('email', email).findOne();
    }

}

module.exports = UserDao;
