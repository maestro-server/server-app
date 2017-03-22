'use strict';

import {Model} from 'mongorito';
import bcrypt from 'bcrypt';
import crypto from '../../helpers/crypto';


class UserDao extends Model {

    collection () {
        return 'users';
    }

    configure () {
        this.before('create', 'passHash');
    }

    passHash (next) {
        this.attributes.password = bcrypt.hashSync(this.attributes.password, crypto.getCryptLevel());
console.log(this.attributes.password);
    }

    static isDuplicate (email) {
        return UserDao.where('email', email).findOne();
    }

}

module.exports = UserDao;
