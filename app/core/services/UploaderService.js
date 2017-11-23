'use strict';

const _ = require('lodash');

const validateFile = require('./validator/uploadValid');

const UploaderService = (Entity) => {
  const typeU = process.env.MAESTRO_UPLOAD_TYPE || 'Local';
  const FUploaderRepository = require(`core/repositories/uploader${typeU}Repository`);

  const UploaderRepository = FUploaderRepository(Entity.name);

    return {
        uploadImage (query, owner) {

            return new Promise((resolve, reject) => {
                const type = query.filetype;
                const {_id} = owner;

                validateFile({type}).check();

                return UploaderRepository
                    .upload(_id, type)
                    .then(resolve)
                    .catch(reject);
            });
        }
    };
};

module.exports = _.curry(UploaderService);
