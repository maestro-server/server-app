'use strict';

const DUploaderService = require('core/services/UploaderService');

const PersistenceApp = (Entity, UploadService = DUploaderService) => {

    return {

        uploader(req, res, next) {

            UploadService(Entity)
                .signed(req, req.user)
                .then(e => res.json(e))
                .catch(next);
        },

        receiverFile(req, res, next) {
            UploadService(Entity)
                .uploadImage(req, req.user)
                .then(e => res.json(e))
                .catch(next);
        }

    };
};

module.exports = PersistenceApp;
