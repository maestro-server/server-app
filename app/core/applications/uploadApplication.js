'use strict';

const DUploaderService = require('core/services/UploaderService');
const formidable = require('formidable');


const PersistenceApp = (Entity, UploadService=DUploaderService) => {

    return {

        uploader (req, res, next) {
            UploadService(Entity)
                .uploadImage(req.query, req.user)
                .then(e => res.json(e))
                .catch(next);
        },

        receiverFile (req, res, next) {
    
            console.log(req.files, req.body);
        }

    };
};

module.exports = PersistenceApp;
