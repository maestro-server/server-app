'use strict';

const Joi = require('joi');

const schema = Joi.object().keys({
    hostname: Joi.string().required(),
    ipv4_private: Joi.string().ip().required(),
    ipv4_public: Joi.string().ip(),
    os: Joi.object({
      base: Joi.string().required(),
      dist: Joi.any(),
      version: Joi.any()
    }).required(),
    cpu: Joi.number(),
    memory: Joi.number(),
    storage: Joi.array(),
    services: Joi.array(),
    dc: Joi.object(),
    role: Joi.string().valid('Application', 'Container', 'Database', 'Hybrid').required(),
    environment: Joi.string().valid('Production', 'Staging', 'Development', 'UTA', 'Training').required(),
    auth: Joi.array(),
    meta: Joi.any(),
    owner: Joi.any(),
    roles: Joi.any(),
    active: Joi.boolean()
});



module.exports = {
    create: schema,
    update: schema,
    delete: {},
    list: {}
};
