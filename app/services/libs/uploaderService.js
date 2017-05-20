'use strict';

const aws = require('aws-sdk');
// const validateFile = require('../helpers/validateUploadFile');
const mapsFile = require('../helpers/maps/mapFileType');

const UploaderError = require('../../errors/uploaderError');


class uploaderService {

    constructor (entity) {
        this.entity = entity;

        return this;
    }


    uploadImage (_id, type) {
      return new Promise((resolve) => {

        /**
         * S3 Bucket store
         */
        const s3 = new aws.S3();

        const s3Params = {
          Bucket: process.env.S3_BUCKET,
          Key: `${_id}.${mapsFile(type)}`,
          Expires: 60,
          ContentType: type,
          ACL: 'public-read'
        };

        s3.getSignedUrl('putObject', s3Params, (err, data) => {
          if(err){
            throw new UploaderError(err);
          }

          const returnData = {
            signedRequest: data,
            url: `https://${process.env.S3_BUCKET}.s3.amazonaws.com/${_id}`
          };

          resolve(JSON.stringify(returnData));
        });

        });
    }

}

module.exports = uploaderService;
