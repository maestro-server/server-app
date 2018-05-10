'use strict';

const Joi = require('joi');

const {roles, storage, services, tags, auth, environment, status, owner, metas, active, datacenters, unique_id, created_at} = require('core/validators/validators');

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
    role: Joi.string().valid('Application', 'Cache', 'Container', 'Database', 'File', 'Loadbalance', 'Monitoring', 'NAT', 'Proxy', 'SMTP', 'VPN', 'Standard').required(),
    auth: Joi.array().items(auth),
    roles: Joi.array().items(roles).unique('_id'),
    tags: Joi.array().items(tags),
    unique_id,
    datacenters,
    environment,
    status,
    active,
    metas,
    owner,
    created_at
});



module.exports = {
    create: schema,
    update: schema,
    delete: {},
    list: {}
};
