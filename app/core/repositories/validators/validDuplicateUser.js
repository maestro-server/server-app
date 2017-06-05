'use strict';

const UserDao = require('../daos/user');
const ConflictError = require('../../errors/conflictError');

module.exports = function(vals) {

    return new Promise((resolve, reject) => {

      UserDao.isDuplicate(vals.email)
      .then(result => {

        if(result instanceof Object) {
            let errors = [{failed:vals.email}];
            throw new ConflictError(errors, "User already exist");
        }

        resolve(vals);
      })
      .catch(e => {
        reject(e);
      });

    });


};
