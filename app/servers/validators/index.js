'use strict';

const Joi = require('joi');

const schema = Joi.object().keys({
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
    storage: Joi.any(),
    services: Joi.any(),
    dc: Joi.object().required(),
    auth: Joi.any(),
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
