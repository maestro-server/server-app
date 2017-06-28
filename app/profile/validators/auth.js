'use strict';

const Joi = require('joi');

const changePass = {
    email: Joi.string().email().required(),
    password: Joi.string().min(4).max(30).required().strip(),
    newpass: Joi.string().min(4).max(30).required().strip()
};

const login = {
    email: Joi.string().email().required(),
    password: Joi.string().min(4).max(30).required().strip()
};

const forgot = {
    email: Joi.string().email().required(),
    callback_url: Joi.string().uri().required(),
};

const forgotChange = {
    token: Joi.string().min(4).required(),
    password: Joi.string().min(4).max(30).required().strip()
};

const idPass = {
    email: Joi.any(),
    _id: Joi.any(),
    password: Joi.any(),
    active: Joi.any()
};

module.exports = {
    changePass: Joi.object().keys(changePass),
    login: Joi.object().keys(login),
    create: Joi.object().keys(idPass),
    update: Joi.object().keys(idPass),
    forgot: Joi.object().keys(forgot),
    forgotChange: Joi.object().keys(forgotChange)
};
