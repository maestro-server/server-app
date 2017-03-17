'use strict';

import {Model} from 'mongorito';


class UserDao extends Model {

    collection () {
        return 'users';
    }

}

module.exports = UserDao;
