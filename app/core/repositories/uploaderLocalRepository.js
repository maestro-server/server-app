'use strict';

const mapsFile = require('./maps/mapFileType');

const UploaderRepository = (folder) => {

    return {
        upload(_id, type) {
            
            const filename = `${_id}.${mapsFile(type)}`;

            return new Promise((resolve) => {

                resolve({
                    signedRequest: "http://localhost:8888/users/upload",
                    url:`http://localhost:8880/uploader/${folder}/${filename}`,
                    filename: `${folder}/${filename}`
                });
            });
            
        }
    };
};

module.exports = UploaderRepository;