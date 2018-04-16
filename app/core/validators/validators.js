'use strict';

const Joi = require('joi');

module.exports = {
    id: Joi.string().max(32),
    roles: Joi.object().keys({
        _id: Joi.object(),
        role: Joi.number().valid(1, 3, 7).required(),
        refs: Joi.string().valid("users", "teams", "projects", "organization").required(),
        name: Joi.string().max(100),
        email: Joi.string().email().max(250)
    }),
    deploy: Joi.object().keys({
        type: Joi.string().max(60),
        provider: Joi.string().max(60),
        notes: Joi.string().max(600)
    }),
    entities: Joi.object({
        name: Joi.string().required(),
        _id: Joi.object()
    }),
    tags: Joi.object().keys({
        value: Joi.string().max(100),
        key: Joi.string().max(100)
    }),
    pdbs: Joi.object().keys({
        name: Joi.string().max(150)
    }),
    asm_groups: Joi.object().keys({
        name: Joi.string().max(150),
        size: Joi.number().positive().max(99924)
    }),
    contacts: Joi.object().keys({
        channel: Joi.string().max(250),
        value: Joi.string().max(250)
    }),
    storage: Joi.object().keys({
        name: Joi.string().max(100),
        size: Joi.number().positive().max(99924),
        root: Joi.string().max(10),
        status: Joi.string().max(10),
        volume_id: Joi.string().max(35),
        attach_time: Joi.string().max(30),
        delete_termination: Joi.any()
    }),
    services: Joi.object().keys({
        name: Joi.string(),
        status: Joi.string().valid('Active', 'Avaliable', 'Stopped').default('Active'),
        version: Joi.string(),
        configs: Joi.object(),
        setup: Joi.object()
    }),
    auth: Joi.object().keys({
        name: Joi.string().max(100),
        type: Joi.string().valid('PKI', 'AD', 'LDAP', 'Password'),
        username: Joi.string().max(100),
        key: Joi.string().max(100)
    }),
    owner: Joi.object({
        name: Joi.string().max(100),
        email: Joi.string().email(),
        _id: Joi.object(),
        refs: Joi.string()
    }),
    interval: Joi.object({
        every: Joi.number().max(1024).default(5),
        period: Joi.string().default('minutes')
    }),
    crontab: Joi.object({
        minute: Joi.string().max(3),
        hour: Joi.string().max(3).default('*'),
        day_of_week: Joi.string().max(3).default('*'),
        day_of_month: Joi.string().max(3).default('*'),
        month_of_year: Joi.string().max(3).default('*')
    }),
    chain: Joi.object({
        _id: Joi.object(),
        countdown: Joi.number(),
        order: Joi.number()
    }),
    unique_id: Joi.string().max(100),
    datacenters: Joi.object(),
    active: Joi.boolean(),
    status: Joi.string().valid('Active', 'Avaliable', 'Stopped').default('Active'),
    environment: Joi.string().valid('Production', 'Staging', 'Development', 'UTA', 'Training', 'SandBox'),
    family: Joi.string().valid('Application', 'Loadbalance', 'Broker', 'Database', 'Serverless', 'Serveless', 'ApiGateway', 'ContainerOrchestration', 'ServiceMesh', 'Cache', 'CDN', 'ObjectStorage', 'Monitor', 'Logs', 'SMTP', 'ServiceDiscovery', 'VPN', 'CI/CD', 'DNS', 'Repository', 'Auth', 'NAS').default("Application"),
    created_at: Joi.any(),
    metas: Joi.any()
};
