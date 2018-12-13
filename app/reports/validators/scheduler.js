'use strict';

const Joi = require('joi');

const {created_at, active, roles, owner, interval, cron, chain} = require('core/validators/validators');

const createS = {
    name: Joi.string().min(3).max(120).required(),
    endpoint: Joi.string().required(),
};

const sharedS = {
    name: Joi.string().min(3).max(120),
    endpoint: Joi.string(),
    _cls: Joi.string().default('PeriodicTask'),
    enabled: Joi.boolean().default(true),
    interval,
    cron,
    args: Joi.array().items(Joi.object()),
    kwargs: Joi.object(),
    chain: Joi.array().items(chain),
    period_type: Joi.string().valid('interval', 'cron'),
    method: Joi.string().valid('GET', 'POST', 'PUT', 'DELETE').default('GET'),
    total_run_count: Joi.number().default(1),
    run_immediately: Joi.boolean().default(false),
    crawling: Joi.boolean().default(true),
    task: Joi.string().valid('webhook', 'connections', 'reports', 'jobs').default('webhook'),
    source: Joi.string().valid('discovery', 'report', 'analytic'),
    link: Joi.object().keys({
        name: Joi.string().max(4050),
        report: Joi.string().max(50),
        provider: Joi.string().max(50),
        owner: Joi.object(),
        _id: Joi.any(),
        task: Joi.string()
    }),
    timer: Joi.any(),
    msg: Joi.string(),
    roles: Joi.array().items(roles).unique('_id'),
    owner,
    active,
    created_at,
    last_run_at: Joi.any()
};

module.exports = {
    create: Joi.object().keys(Object.assign({}, sharedS, createS)).xor('interval', 'cron'),
    update: Joi.object().keys(sharedS),
    delete: {},
    list: {}
};
