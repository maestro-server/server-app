'use strict';
const _ = require('lodash');
const Joi = require('joi');
const {roles, tags, owner, created_at, unique_id, active} = require('core/validators/validators');



const validate = (singleFilled) => {

    const template = {
        name: Joi.string().min(3).max(30).required(),
        datacenters: Joi.object(),
        owner,
        roles: Joi.array().items(roles).unique('_id'),
        tags: Joi.array().items(tags),
        unique_id,
        active,
        created_at
    };

    _.map(singleFilled, (key) => {
        if(!_.has(template, key)) {
            _.set(template, key, Joi.any());
        }
    });

    const schema = Joi.object().keys(template);
    return {
        create: schema,
        update: schema,
        delete: {},
        list: {}
    };
};

module.exports = validate;
