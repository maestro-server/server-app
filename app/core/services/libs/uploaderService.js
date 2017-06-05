'use strict';

const UploaderRepository = require('../../repositories/uploaderRepository');
const validateFile = require('../helpers/validateUploadFile');


class uploaderService {

    constructor(entity) {
        this.entity = entity;

        return this;
    }

    uploadImage(_id, type) {
        return new Promise((resolve, reject) => {

            new validateFile({type})
                .check()
                .then(() => {
                    return new UploaderRepository()
                        .upload(_id, type, this.entity);
                })
                .then((e) => {
                    resolve(e);
                })
                .catch((err) => {
                    reject(err);
                });

        });
    }

}

module.exports = uploaderService;
