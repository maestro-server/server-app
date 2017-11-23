'use strict';

const aws = require('aws-sdk');
const mapsFile = require('./maps/mapFileType');
const UploaderError = require('core/errors/factoryError')('UploaderError');


const UploaderRepository = (folder) => {

    return {
        upload(_id, type) {
            return new Promise((resolve) => {

                const s3 = new aws.S3();
                const S3_BUCKET = process.env.AWS_S3_BUCKET_NAME || 'maestro';
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
                        url: `https://${S3_BUCKET}.s3.amazonaws.com/${folder}/${filename}`,
                        filename: `${folder}/${filename}`
                    };

                    resolve(returnData);
                });

            });
        }
    };
};

module.exports = UploaderRepository;
