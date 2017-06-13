'use strict';

const _ = require('lodash');
const FactoryDBRepository = require('core/repositories/DBRepository');
const ClosurePromesify = require('core/libs/factoryPromisefy');

const validPassMatch = require('profile/validators/validPassMatch');
const tokenTransform = require('profile/transforms/tokenTransform');

const AuthService = (Entity) => {

    const DBRepository = FactoryDBRepository(Entity);

    return {
      authenticate (body) {

        return ClosurePromesify(() => {

          const {email} = body;
          const {password} = body;

          return DBRepository
              .findOne({email})
              .then((e) => {
                  return validPassMatch(password, e);
              })
              .then((e) => {
                  return tokenTransform(e);
              });
        });
      }
    };



};

module.exports = AuthService;
