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
  _id: Joi.object()
});

const tags = Joi.object().keys({
  value: Joi.string().max(100),
  key: Joi.string().max(100)
});

const cluster = Joi.object().keys({
  _id: Joi.string().max(100),
  name: Joi.string().max(100),
  storage_types: Joi.string().max(100),
  asm: Joi.object({
    _id: Joi.string().max(100)
  })
});

const asm_groups = Joi.object().keys({
  name: Joi.string().max(150),
  size: Joi.string().max(50)
});


const schema = Joi.object().keys({
    name: Joi.string().min(3).max(30).required(),
    description: Joi.string().max(800),
    system:  Joi.array().items(system).unique(),
    servers: Joi.array().items(server).unique(),
    targets: Joi.array().items(server).unique(),
    own: Joi.number().max(1),
    owner: Joi.object({
      name: Joi.string().max(100),
      email: Joi.string().email(),
      _id: Joi.object(),
      refs: Joi.string()
    }),
    role: Joi.object({
      role: Joi.string().valid('Application', 'Worker', 'Jobs', 'Testing', 'Standard'),
      endpoint: Joi.string().uri().max(150),
      path: Joi.string().max(150),
      code: Joi.string().max(150),
      notes: Joi.string().max(800),
      cron: Joi.string().max(50),
      name: Joi.string().max(150),
      version: Joi.string().max(30),
      patch: Joi.string().max(30),
      healthcheck: Joi.string().max(150),
      extra_config: Joi.string().max(1500),
      memory: Joi.number().max(16024),
      timeout: Joi.string().max(20),
      trigger: Joi.string().max(500),
      handler: Joi.string().max(80),
      port: Joi.number().positive(),
      sga: Joi.string().max(25),
      pga: Joi.string().max(25),
      dns: Joi.string().max(150)
    }),
    language: Joi.string().min(3).max(30),
    provider: Joi.string().min(3).max(20),
    cluster:  Joi.object({
      type: Joi.string().max(50),
      crs_version: Joi.string().max(50),
      items: Joi.array().items(cluster).unique('_id')
    }),
    dataguard: Joi.string().max(40),
    storage_types: Joi.string().max(40),
    asm_groups: Joi.array().items(asm_groups),
    deploy: Joi.array().items(deploy),
    type: Joi.string().min(3).max(30),
    roles: Joi.array().items(roles).unique('_id'),
    environment: Joi.string().valid('Production', 'Staging', 'Development', 'UTA', 'Training', 'SandBox').required(),
    family: Joi.string().valid('Application', 'Loadbalance', 'Broker', 'Database', 'Serverless', 'Serveless', 'ApiGateway', 'ContainerOrchestration', 'Cache', 'CDN', 'ObjectStorage', 'Monitor', 'Logs', 'SMTP', 'ServiceDiscovery', 'VPN').default("Application"),
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
