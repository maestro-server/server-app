'use strict';

const _ = require('lodash');
const aws = require('aws-sdk');
const mapsFile = require('./maps/mapFileType');
const UploaderError = require('core/errors/factoryError')('UploaderError');

const factoryValid = require('core/libs/factoryValid');
const s3Valid = require('core/validators/s3_valid');


const UploaderRepository = (folder) => {

    factoryValid(
        _.pick(process.env, ['AWS_S3_BUCKET_NAME', 'AWS_ACCESS_KEY_ID', 'AWS_SECRET_ACCESS_KEY']),
        s3Valid
    );

    return {

        upload(_id, type) {
            return new Promise((resolve) => {

                const s3 = new aws.S3();
                const S3_BUCKET = process.env.AWS_S3_BUCKET_NAME;
                const PATH = S3_BUCKET + '/' + folder;
                const filename = `${_id}.${mapsFile(type)}`;

                const s3Params = {
                    Bucket: PATH,
                    Key: filename,
                    Expires: 60,
                    ContentType: type,
                    ACL: 'public-read'
                };

                s3.getSignedUrl('putObject', s3Params, (err, data) => {
                    if (err) {
                        throw new UploaderError(err);
                    }

                    const returnData = {
                        signedRequest: data,
                        url: `https://s3.amazonaws.com/${S3_BUCKET}/${folder}/${filename}`,
                        filename: `${folder}/${filename}`,
                        headers: {"Content-type": type}
                    };

                    resolve(returnData);
                });

            });
        }
    };
};

module.exports = UploaderRepository;
