'use strict';

import UserRepository from '../repositories/usersRepository';
import Promises from 'bluebird';

class UsersService {


    static create(user, hook=null) {

        let created = new Promise(function(resolve, reject) {

            let promises = new UserRepository()
                .createUser(user)
                .then(function(users){
                    resolve(users);
                })
                .catch(function(err) {
                    reject(err);
                });

        });

        return created;
    }
}

module.exports = UsersService;
