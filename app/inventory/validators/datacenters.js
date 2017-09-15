'use strict';

const Joi = require('joi');

const roles = Joi.object().keys({
  _id: Joi.object(),
  role: Joi.number().valid(1, 3, 7).required(),
  refs: Joi.string().valid("users", "teams", "projects").required(),
  name: Joi.string().max(100),
  email: Joi.string().max(250)
});

const create = {
  name: Joi.string().min(3).max(30).required()
};

const scheme = {
    name: Joi.string().min(3).max(30),
    role: Joi.any(),
    zones: Joi.array(),
    regions: Joi.array(),
    provider: Joi.string(),
    servers_count: Joi.number(),
    owner: Joi.object({
      name: Joi.string().max(100),
      email: Joi.string().email(),
      _id: Joi.object(),
      refs: Joi.string()
    }),
    auth: Joi.array(),
    roles: Joi.array().items(roles).unique('_id'),
    metas: Joi.any(),
    active: Joi.boolean()
};

module.exports = {
    create: Joi.object().keys(Object.assign({}, scheme, create)),
    update: Joi.object().keys(Object.assign({}, scheme)),
    delete: {},
    list: {}
};
