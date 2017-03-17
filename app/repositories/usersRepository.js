'use strict';

import UserDao from './daos/user'

class UsersRepository {

    constructor() {}

    getUser(id) {

    }

    getUsers(limit = 20, filters = null) {

    }

    createUser(user) {
        console.log(user);

        let dao = new UserDao(user);

        dao.save();

    }
}

module.exports = UsersRepository;
