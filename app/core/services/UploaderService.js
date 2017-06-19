'use strict';

const UploaderRepository = require('core/repositories/uploaderRepository');
const validateFile = require('core/validators/uploadValid');

const ClosurePromesify = require('core/libs/factoryPromisefy');

const UploaderService = (Entity) => {

    return {
        uploadImage (query, owner) {

            return ClosurePromesify(() => {
                const type = query.filetype;
                const {_id} = owner;

                validateFile({type}).check();

                return UploaderRepository(Entity.name)
                    .upload(_id, type);
            });
        }
    };
};

module.exports = UploaderService;
