'use strict';

const Joi = require('joi');

const schema = Joi.object().keys({
    key: Joi.string().max(35).required(),
    value: Joi.any().required(),
    active: Joi.boolean()
});

module.exports = {
    create: schema,
    update: schema,
    delete: {},
    list: {}
};
