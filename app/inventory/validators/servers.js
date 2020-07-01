'use strict';

const Joi = require('joi');

const {roles, storage, services, tags, auth, environment, status, owner, metas, active, entries, datacenters, unique_id, created_at, checksum} = require('core/validators/validators');

const schema = Joi.object().keys({
    name: Joi.string().required().max(100),
    hostname: Joi.string().max(100),
    ipv4_private: Joi.string().ip(),
    ipv4_public: Joi.string().ip(),
    os: Joi.object({
      base: Joi.string().max(40),
      dist: Joi.string().max(40),
      version: Joi.string(),
      file_path: Joi.string(),
      variety: Joi.string(),
      major_version: Joi.string()
    }),
    cpu: Joi.number().positive().max(1024),
    memory: Joi.number().positive().max(1024),
    storage: Joi.array().items(storage).unique('name'),
    services: Joi.array().items(services),
    role: Joi.string(),
    auth: Joi.array().items(auth),
    roles: Joi.array().items(roles).unique('_id'),
    applications: Joi.array().items(entries).unique(),
    tags: Joi.array().items(tags),
    dns_public: Joi.string(),
    dns_private: Joi.string(),
    image: Joi.object(),
    backup_ids: Joi.array(),
    next_backup_window: Joi.any(),
    snapshot_ids: Joi.array(),
    network_interface: Joi.any(),
    devices: Joi.any(),
    env_vars: Joi.any(),
    dns: Joi.any(),
    network_lo: Joi.any(),
    ipv4_all: Joi.any(),
    ipv6_all: Joi.any(),
    service_mgr: Joi.string(),
    pkg_mgr: Joi.string(),
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
