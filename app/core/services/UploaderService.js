'use strict';

const _ = require('lodash');
const formidable = require('formidable');
const validateFile = require('./validator/uploadValid');
const {TYPE_DEFAULT} = require('core/configs/uploadRole');
const getPwdPath = require('core/libs/pwd');

const UploaderService = (Entity) => {
  const typeU = process.env.MAESTRO_UPLOAD_TYPE || TYPE_DEFAULT;
  const FUploaderRepository = require(`core/repositories/uploader${typeU}Repository`);

  const UploaderRepository = FUploaderRepository(Entity.name);

    return {
        signed ({query, headers}, owner) {

            return new Promise((resolve, reject) => {
                const {filetype:type, filename} = query;
                const {_id} = owner;

                validateFile({type}).check();

                return UploaderRepository
                    .upload(_id, type, filename, headers)
                    .then(resolve)
                    .catch(reject);
            });
        },

        readImage({query}) {
            const {filename} = query;

            return new Promise((resolve, reject) => {
                return UploaderRepository
                    .readfiles(filename)
                    .then(resolve)
                    .catch(reject);
            });
        },

        uploadImage(req, owner) {
            return new Promise((resolve, reject) => {

                const form = new formidable.IncomingForm({uploadDir: getPwdPath()});
                form.parse(req, (err, fields, files) => {
                    if (err) reject(err);

                    const {query} = req;
                    return UploaderRepository
                        .download(files, query, owner)
                        .then(resolve)
                        .catch(reject);
                });

            });
        }
    };
};

module.exports = _.curry(UploaderService);
