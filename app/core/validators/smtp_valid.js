'use strict';

const Joi = require('joi');

const smtp = {
    SMTP_PORT: Joi.number().required(),
    SMTP_HOST: Joi.string().required(),
    SMTP_PASSWORD: Joi.string().required(),
    SMTP_SENDER: Joi.string().email().required()
};

module.exports = Joi.object().keys(smtp);
