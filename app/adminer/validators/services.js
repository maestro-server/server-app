'use strict';

const Joi = require('joi');

const string = Joi.string().max(32);

const schema = Joi.object().keys({
    name: Joi.string().max(180).required(),
    family: Joi.array().items().unique().required(),
    tags: Joi.array().items(string).unique(),
    owner: Joi.boolean(),
    active: Joi.boolean(),
    created_at: Joi.any()
});

module.exports = {
    create: schema,
    update: schema,
    delete: {},
    list: {}
};
