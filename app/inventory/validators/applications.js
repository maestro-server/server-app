'use strict';

const Joi = require('joi');

const {id, roles, deploy, entities, tags, owner, pdbs, asm_groups, env, family} = require('core/validators/validators')


const schema = Joi.object().keys({
    name: Joi.string().min(3).max(30).required(),
    description: Joi.string().max(800),
    system:  Joi.array().items(entities).unique(),
    servers: Joi.array().items(id).unique(),
    targets: Joi.array().items(id).unique(),
    own: Joi.number().max(1),
    owner,
    role: Joi.object({
      role: Joi.string().valid('Application', 'Worker', 'Jobs', 'Testing', 'Standard'),
      endpoint: Joi.string().uri().max(150),
      description: Joi.string().max(800),
      path: Joi.string().max(150),
      code: Joi.string().max(150),
      notes: Joi.string().max(800),
      cron: Joi.string().max(50),
      name: Joi.string().max(150),
      version: Joi.string().max(30),
      patch: Joi.string().max(30),
      healthcheck: Joi.string().max(150),
      extra_config: Joi.string().max(1500),
      tns: Joi.string().max(1500),
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
    cluster:  Joi.string().max(100),
    dataguard: Joi.string().max(40),
    storage_types: Joi.string().max(40),
    asm_groups: Joi.array().items(asm_groups),
    pdbs: Joi.array().items(pdbs),
    crs_version: Joi.string().max(40),
    deploy: Joi.array().items(deploy),
    type: Joi.string().min(3).max(30),
    modal: Joi.string().max(30),
    roles: Joi.array().items(roles).unique('_id'),
    environment: env,
    family: family,
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
