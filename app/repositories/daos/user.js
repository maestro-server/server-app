'use strict';

const Dao = require('./dao');
const bcrypt = require('bcrypt');
const crypto = require('../../helpers/crypto');

const {Model} = require('mongorito');

class UserDao extends Dao {

    collection () {
        return 'users';
    }

    configure () {
      super.configure();
      this.before('save', 'passHash');
    }

    passHash () {
        if (this.get('password'))
            this.set('password', UserDao.makeHash(this.get('password')));
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
