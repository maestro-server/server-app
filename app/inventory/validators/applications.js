'use strict';

const Joi = require('joi');

const server = Joi.string().max(32);

const roles = Joi.object().keys({
  _id: Joi.object(),
  role: Joi.number().valid(1, 3, 7).required(),
  refs: Joi.string().valid("users", "teams", "projects").required(),
  name: Joi.string().max(100),
  email: Joi.string().max(250)
});

const deploy = Joi.object().keys({
  type: Joi.string().max(60),
  provider: Joi.string().max(60),
  notes: Joi.string().max(600)
});

const system = Joi.object({
  name: Joi.string().required(),
  _id: Joi.string().required()
});

const tags = Joi.object().keys({
  value: Joi.string().max(100),
  key: Joi.string().max(100)
});

const schema = Joi.object().keys({
    name: Joi.string().min(3).max(30).required(),
    description: Joi.string().max(800),
    system:  Joi.array().items(system).unique(),
    servers: Joi.array().items(server).unique(),
    owner: Joi.object({
      name: Joi.string().max(100),
      email: Joi.string().email(),
      _id: Joi.object(),
      refs: Joi.string()
    }),
    spec: Joi.object({
      role: Joi.string().valid('Application', 'Worker', 'Jobs', 'Service Discovery', 'Monitoring', 'Testing', 'Standard').required(),
      endpoint: Joi.string().uri().max(250),
      path: Joi.string().max(150),
      command: Joi.string().max(150),
      notes: Joi.string().max(800),
      cron: Joi.string().max(50),
      name: Joi.string().max(150)
    }).required(),
    language: Joi.string().min(3).max(30).required(),
    cluster: Joi.string().max(80),
    deploy: Joi.array().items(deploy),
    roles: Joi.array().items(roles).unique('_id'),
    environment: Joi.string().valid('Production', 'Staging', 'Development', 'UTA', 'Training', 'SandBox').required(),
    family: Joi.string().valid('Application', 'LoadBalance', 'Broker', 'DataBase', 'Serveless', 'Api Gateway', 'SearchEngine', 'Cache').default("Application"),
    tags: Joi.array().items(tags),
    active: Joi.boolean()
});

module.exports = {
    create: schema,
    update: schema,
    delete: {},
    list: {}
};
