'use strict';

const Joi = require('joi');

const member = Joi.object({
  email: Joi.string().email(),
  name: Joi.string().min(1).max(40),
  _id: Joi.object(),
  refs: Joi.string().max(35)
});

const roles = Joi.object().keys({
  _id: Joi.object(),
  role: Joi.number().valid(1, 3, 7).required(),
  refs: Joi.string().valid("users", "teams", "projects").required(),
  name: Joi.string().max(100),
  email: Joi.string().max(250)
});

const schema = Joi.object().keys({
    owner: member,
    members: Joi.array().items(roles).unique('_id'),
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email(),
    avatar: Joi.string().min(3).max(200),
    url: Joi.string().uri({scheme: ['http', 'https']}),
    active: Joi.boolean()
});

module.exports = {
    create: schema,
    update: schema,
    delete: {},
    list: {}
};
