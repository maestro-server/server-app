'use strict';

const Joi = require('joi');

const storage = Joi.object().keys({
  name: Joi.string(),
  size: Joi.number(),
  root: Joi.string()
});

const services = Joi.object().keys({
  name: Joi.string(),
  version: Joi.string(),
  implements: Joi.object()
});

const auth = Joi.object().keys({
  name: Joi.string(),
  type: Joi.string().valid('PKI', 'AD', 'LDAP', 'Password'),
  username: Joi.string(),
  key: Joi.string()
});

const tags = Joi.object().keys({
  value: Joi.string(),
  key: Joi.string()
});

const schema = Joi.object().keys({
    status: Joi.string().valid('Active', 'Avaliable', 'Deprecated'),
    hostname: Joi.string().required(),
    ipv4_private: Joi.string().ip().required(),
    ipv4_public: Joi.string().ip(),
    os: Joi.object({
      base: Joi.string().required(),
      dist: Joi.string(),
      version: Joi.string()
    }).required(),
    cpu: Joi.number(),
    memory: Joi.number(),
    storage: Joi.array().items(storage),
    services: Joi.array().items(services),
    dc: Joi.object(),
    role: Joi.string().valid('Application', 'Container', 'Database', 'Hybrid').required(),
    environment: Joi.string().valid('Production', 'Staging', 'Development', 'UTA', 'Training').required(),
    auth: Joi.array().items(auth),
    tags: Joi.array().items(tags),
    meta: Joi.any(),
    owner: Joi.object({
      email: Joi.string().email(),
      _id: Joi.object(),
      refs: Joi.string()
    }),
    roles: Joi.array(),
    active: Joi.boolean()
});



module.exports = {
    create: schema,
    update: schema,
    delete: {},
    list: {}
};
