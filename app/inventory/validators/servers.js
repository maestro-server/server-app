'use strict';

const Joi = require('joi');

const storage = Joi.object().keys({
  name: Joi.string().max(100),
  size: Joi.number().positive().max(10024),
  root: Joi.string().max(10)
});

const services = Joi.object().keys({
  name: Joi.string(),
  version: Joi.string(),
  configs: Joi.object(),
  setup: Joi.object()
});

const auth = Joi.object().keys({
  name: Joi.string().max(100),
  type: Joi.string().valid('PKI', 'AD', 'LDAP', 'Password'),
  username: Joi.string().max(100),
  key: Joi.string().max(100)
});

const tags = Joi.object().keys({
  value: Joi.string().max(100),
  key: Joi.string().max(100)
});

const roles = Joi.object().keys({
  _id: Joi.object(),
  role: Joi.number().valid(1, 3, 7).required(),
  refs: Joi.string().valid("users", "teams", "projects").required(),
  name: Joi.string().max(100),
  email: Joi.string().max(250)
});

const schema = Joi.object().keys({
    hostname: Joi.string().required().max(100),
    ipv4_private: Joi.string().ip().required(),
    ipv4_public: Joi.string().ip(),
    os: Joi.object({
      base: Joi.string().required().max(40),
      dist: Joi.string().max(40),
      version: Joi.string()
    }).required(),
    cpu: Joi.number().positive().max(1024),
    memory: Joi.number().positive().max(1024),
    storage: Joi.array().items(storage).unique('name'),
    services: Joi.array().items(services),
    datacenters: Joi.object(),
    role: Joi.string().valid('Application', 'Cache', 'Container', 'Database', 'File', 'Loadbalance', 'Monitoring', 'NAT', 'Proxy', 'SMTP', 'VPN', 'Standard').required(),
    environment: Joi.string().valid('Production', 'Staging', 'Development', 'UTA', 'Training', 'SandBox').required(),
    auth: Joi.array().items(auth),
    owner: Joi.object({
      name: Joi.string().max(100),
      email: Joi.string().email(),
      _id: Joi.object(),
      refs: Joi.string()
    }),
    roles: Joi.array().items(roles).unique('_id'),
    tags: Joi.array().items(tags),
    status: Joi.string().valid('Active', 'Avaliable').default('Active'),
    active: Joi.boolean(),
    created_at: Joi.any()
});



module.exports = {
    create: schema,
    update: schema,
    delete: {},
    list: {}
};
