'use strict';

const Joi = require('joi');

const roles = Joi.object().keys({
  _id: Joi.object(),
  role: Joi.number().valid(1, 3, 7).required(),
  refs: Joi.string().valid("users", "teams", "projects").required(),
  name: Joi.string().max(100),
  email: Joi.string().max(250)
});

const contacts = Joi.object().keys({
  channel: Joi.string().max(250),
  value: Joi.string().max(250)
});

const tags = Joi.object().keys({
  value: Joi.string().max(100),
  key: Joi.string().max(100)
});

const schema = Joi.object().keys({
    name: Joi.string().min(3).max(30).required(),
    description: Joi.string().max(800),
    contacts:  Joi.array().items(contacts).unique(),
    owner: Joi.object({
      name: Joi.string().max(100),
      email: Joi.string().email(),
      _id: Joi.object(),
      refs: Joi.string()
    }),
    roles: Joi.array().items(roles).unique('_id'),
    tags: Joi.array().items(tags),
    active: Joi.boolean(),
    created_at: Joi.any()
});

module.exports = {
    create: schema,
    update: schema,
    delete: {},
    list: {}
};
