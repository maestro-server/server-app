'use strict';

const Joi = require('joi');

const addRole = {
    refs: Joi.string().valid("users", "teams", "projects").required(),
    id: Joi.string().required(),
    role: Joi.string().valid("1", "3", "7").required(),
    name: Joi.any(),
    email: Joi.any()
};

const updateRole = {
    role: Joi.string().valid("1", "3", "7").required(),
    refs: Joi.string().valid("users", "teams", "projects").required(),
    name: Joi.any(),
    email: Joi.any()
};

module.exports = {
    create: Joi.object().keys(addRole),
    update: Joi.object().keys(updateRole)
};
