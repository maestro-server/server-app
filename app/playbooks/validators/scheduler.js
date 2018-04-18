'use strict';

const Joi = require('joi');

const {created_at, active, roles, owner, interval, crontab, chain} = require('core/validators/validators');

const schema = Joi.object().keys({
    _cls: Joi.string().default('PeriodicTask'),
    name: Joi.string().min(3).max(30).required(),
    enabled: Joi.boolean().default(true),
    interval,
    crontab,
    args: Joi.array().items(Joi.object()),
    kwargs: Joi.object(),
    chain: Joi.array().items(chain),
    endpoint: Joi.string().uri(),
    period_type: Joi.string().valid('interval', 'crontab'),
    module: Joi.string().valid('webhook', 'connections', 'jobs'),
    method: Joi.string().valid('GET', 'POST', 'PUT', 'DELETE').default('GET'),
    total_run_count: Joi.number().default(1),
    max_execution: Joi.number(),
    roles: Joi.array().items(roles).unique('_id'),
    owner,
    active,
    created_at,
    last_run_at: Joi.any()
}).or('interval', 'crontab');

module.exports = {
    create: schema,
    update: schema,
    delete: {},
    list: {}
};
