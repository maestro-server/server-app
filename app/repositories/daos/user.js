'use strict';

import {Model} from 'mongorito';


class UsersModel extends Model {
    collection: 'users'
}

module.exports = UsersModel;
