'use strict';

const Joi = require('joi');

const s3 = {
    S3_BUCKET_NAME: Joi.string().required(),
    AWS_ACCESS_KEY_ID: Joi.string().required(),
    AWS_SECRET_ACCESS_KEY: Joi.string().required()
};

module.exports = Joi.object().keys(s3);
