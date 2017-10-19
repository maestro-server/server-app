'use strict';

const DUploaderService = require('core/services/UploaderService');


const PersistenceApp = (Entity, UploadService=DUploaderService) => {

    return {

        uploader (req, res, next) {
            UploadService(Entity)
                .uploadImage(req.query, req.user)
                .then(e => res.json(e))
                .catch(next);
        }

    };
};

module.exports = PersistenceApp;
