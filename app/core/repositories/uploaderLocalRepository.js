'use strict';

const _ = require('lodash');
const fs = require('fs');
const mkdirp = require('mkdirp');
const MapFileType = require('./maps/mapFileType');
const makeName = require('./transforms/makeFileName');
const getPwdPath = require('core/libs/pwd');

const {CONTENT_UPLOAD_DEFAULT, LOCAL_DIR_DEFAULT, PRIVATE_DIR_DEFAULT} = require('core/configs/uploadRole');

const UploaderRepository = (folder) => {
    const base_api = (host) => {
        const url = process.env.API_URL || `//${host}`;
        return url.replace(/\/$/, "");
    };

    const get_folder = (ext) => {
        const type = MapFileType().getType(ext);

        if (MapFileType(type).isPublic()) {
            return process.env.LOCAL_DIR || LOCAL_DIR_DEFAULT;
        } else {
            return process.env.PRIVATE_LOCAL_DIR || PRIVATE_DIR_DEFAULT;
        }
    };

    return {
        upload(_id, type, name, headers) {
            const ext = MapFileType(type).getExtesion();
            const filename = makeName(name, ext);

            const path = `${folder}/${_id}/${filename}`;

            return new Promise((resolve) => {
                const {authorization, host} = headers;
                const url = base_api(host);

                resolve({
                    signedRequest: `${url}/users/upload?ext=${ext}&folder=${folder}&name=${name}`,
                    filename: path,
                    headers: {"Content-type": CONTENT_UPLOAD_DEFAULT, "Authorization": authorization}
                });
            });

        },

        download(files, query, owner) {
            return new Promise((resolve, reject) => {
                const {path} = files.file;
                const appRoot = getPwdPath();
                const {name, ext, folder:pfolder} = query;
                const {_id} =  owner;

                const base = get_folder(ext);
                const filename = makeName(name, ext);

                const newPath = `${appRoot}${base}/${pfolder}/${_id}/`;
                if (!fs.existsSync(newPath)){
                    mkdirp.sync(newPath);
                    console.log(`${newPath} was created`);
                }

                fs.rename(path, newPath + filename, (err2) => {
                    if (err2) reject(err2);
                    resolve();
                });
            });
        },

        readfiles(filename) {
            const ext = filename.split('.').pop()
            const base = get_folder(ext);
            const appRoot = getPwdPath();

            return new Promise((resolve, reject) => {
                const fullpath = `${appRoot}${base}/${filename}`;

                fs.readFile(fullpath, 'utf8',(err, data) => {
                    if (err) reject(err);
                    if (ext === "json") data = JSON.parse(data);

                    resolve(data);
                });

            });
        }
    };
};

module.exports = UploaderRepository;
