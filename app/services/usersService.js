'use strict';

import UserRepository from '../repositories/usersRepository';

class UsersService {


    static create(user) {

        let repository = new UserRepository();
        repository.createUser(user);
    }
}

module.exports = UsersService;
