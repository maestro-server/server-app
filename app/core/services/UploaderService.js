'use strict';

const DUploaderRepository = require('core/repositories/uploaderRepository');
const validateFile = require('./validator/uploadValid');

const ClosurePromesify = require('core/libs/factoryPromisefy');

const UploaderService = (Entity, FUploaderRepository = DUploaderRepository) => {

  const UploaderRepository = FUploaderRepository(Entity.name);

    return {
        uploadImage (query, owner) {

            return ClosurePromesify(() => {
                const type = query.filetype;
                const {_id} = owner;

                validateFile({type}).check();
                return UploaderRepository
                    .upload(_id, type);
            });
        }
    };
};

module.exports = UploaderService;
