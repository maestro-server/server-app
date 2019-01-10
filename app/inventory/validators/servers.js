'use strict';

const Joi = require('joi');

const {roles, storage, services, tags, auth, environment, status, owner, metas, active, entries, datacenters, unique_id, created_at, checksum} = require('core/validators/validators');

const schema = Joi.object().keys({
    hostname: Joi.string().required().max(100),
    ipv4_private: Joi.string().ip().required(),
    ipv4_public: Joi.string().ip(),
    os: Joi.object({
      base: Joi.string().max(40),
      dist: Joi.string().max(40),
      version: Joi.string()
    }),
    cpu: Joi.number().positive().max(1024),
    memory: Joi.number().positive().max(1024),
    storage: Joi.array().items(storage).unique('name'),
    services: Joi.array().items(services),
    role: Joi.string().valid('Application', 'Cache', 'Container', 'Database', 'File', 'Loadbalance', 'Monitoring', 'NAT', 'Proxy', 'SMTP', 'VPN', 'Standard'),
    auth: Joi.array().items(auth),
    roles: Joi.array().items(roles).unique('_id'),
    applications: Joi.array().items(entries).unique(),
    tags: Joi.array().items(tags),
    dns_public: Joi.string(),
    dns_private: Joi.string(),
    image: Joi.object(),
    backup_ids: Joi.array(),
    next_backup_window: Joi.object(),
    snapshot_ids: Joi.array(),
    checksum,
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
