'use strict';

const AuthService = require('profile/services/AuthService');

const AuthApp = (Entity) => {

    return {
      login (req, res, next) {

        console.log(AuthService(Entity));

          AuthService(Entity)
              .authenticate(req.body)
              .then(e => res.json(e))
              .catch(function (e) {
                  next(e);
              });

      }
    };
};

module.exports = AuthApp;
