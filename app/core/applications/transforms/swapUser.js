'use strict';

const _ = require('lodash');

const changerUser = function (user, Entity) {
  return Object.assign({},
    _.pick(user, 'name', 'email', '_id'),
    {refs: Entity.name});
};

module.exports = function (req, user, params, ACEntity) {

  return Object.assign({}, req, {
    user: changerUser(user, ACEntity),
    params: {
      id: _.get(params, 'idu'),
      idu: _.get(params, 'ida')
    }
  });

};
