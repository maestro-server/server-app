'use strict';

const _ = require('lodash');
const aws = require('aws-sdk');
const MapFileType = require('./maps/mapFileType');
const makeName = require('./transforms/makeFileName');
const UploaderError = require('core/errors/factoryError')('UploaderError');

const factoryValid = require('core/libs/factoryValid');
const s3Valid = require('core/validators/s3_valid');


const UploaderRepository = (folder) => {

    factoryValid(
        _.pick(process.env, ['AWS_S3_BUCKET_NAME', 'AWS_ACCESS_KEY_ID', 'AWS_SECRET_ACCESS_KEY']),
        s3Valid
    );

    const isPublic = (type) => {
        if (MapFileType(type).isPublic()) {
            return {
                "scope": "PUBLIC",
                "acl": 'public-read'
            };
        } else {
            return {
                "scope": "PRIVATE",
                "acl": null
            };
        }
    };

    const build_options = (type) => {
        const {scope, acl} = isPublic(type);

        let options = {
            scope,
            acl,
            "base": `${folder}`,
            "bucket": process.env[`AWS_S3_${scope}_BUCKET_NAME`] || process.env.AWS_S3_BUCKET_NAME,
            "accessKeyId": process.env[`AWS_S3_${scope}_ACCESS_KEY_ID`] || process.env.AWS_ACCESS_KEY_ID,
            "secretAccessKey": process.env[`AWS_S3_${scope}_SECRET_ACCESS_KEY`] || process.env.AWS_SECRET_ACCESS_KEY
        };

        if(process.env.AWS_ENDPOINT) {
            const endpoint = new aws.Endpoint(process.env.AWS_ENDPOINT);
            options = {endpoint};
        }

        return options;
    };

    return {

        upload(_id, type, name) {
            return new Promise((resolve) => {
                const ext = MapFileType(type).getExtesion();
                const options = build_options(type);
                const s3 = new aws.S3(options);

                const {base, bucket, acl} = options;
                const path = `${bucket}/${base}/${_id}`;
                const filename = makeName(name, ext);

                const s3Params = {
                    Bucket: path,
                    Key: filename,
                    Expires: 60,
                    ContentType: type,
                    ACL: acl
                };

                s3.getSignedUrl('putObject', s3Params, (err, data) => {
                    if (err) throw new UploaderError(err);

                    const returnData = {
                        signedRequest: data,
                        url: `https://s3.amazonaws.com/${path}/${filename}`,
                        filename: `${base}/${_id}/${filename}`,
                        headers: {"Content-type": type}
                    };

                    resolve(returnData);
                });

            });
        },

        readfiles(filename) {
            const ext = filename.split('.').pop()
            const type = MapFileType().getType(ext);
            const options = build_options(type);

            return new Promise((resolve, reject) => {
                const s3 = new aws.S3(options);
                const {bucket} = options;

                s3.getObject({
                    Bucket: bucket,
                    Key: filename.replace(/^\/|\/$/g, '')
                })
                    .promise()
                    .then((data) => {
                        let dt = data.Body;

                        if(data.ContentType.indexOf("image") === -1)
                            dt = dt.toString();

                        if(data.ContentType.indexOf("application/json") !== -1)
                            dt = JSON.parse(dt);

                        resolve(dt);
                    })
                    .catch(reject);
            });
        }
    };
};

module.exports = UploaderRepository;
