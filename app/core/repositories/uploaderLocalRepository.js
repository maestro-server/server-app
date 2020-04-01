'use strict';

const _ = require('lodash');
const fs = require('fs');
const mapsFile = require('./maps/mapFileType');
const getPwdPath = require('core/libs/pwd');

const {CONTENT_UPLOAD_DEFAULT, LOCAL_DIR_DEFAULT} = require('core/configs/uploadRole');

const UploaderRepository = (folder) => {

    return {
        upload(_id, type, headers) {
            const filename = `${_id}.${mapsFile(type)}`;

            return new Promise((resolve) => {
                const {authorization, host} = headers;

                resolve({
                    signedRequest: `//${host}/users/upload?ext=${mapsFile(type)}&folder=${folder}`,
                    filename: `${folder}/${filename}`,
                    headers: {"Content-type": CONTENT_UPLOAD_DEFAULT, "Authorization": authorization}
                });
            });

        },
        
        download(files, query, owner) {
            return new Promise((resolve, reject) => {
                const {path} = files.file;
                const appRoot = getPwdPath();
                const base = process.env.LOCAL_DIR || LOCAL_DIR_DEFAULT;
                const filename = `${_.get(owner, '_id')}.${_.get(query, 'ext')}`;
                const newPath = `${appRoot}${base}/${_.get(query, 'folder')}/`;

                if (!fs.existsSync(newPath)){
                    fs.mkdirSync(newPath);
                }

                fs.rename(path, newPath + filename, (err2) => {
                    if (err2) reject(err2);
                    resolve();
                });
            });
        }
    };
};

module.exports = UploaderRepository;
