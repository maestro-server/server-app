'use strict';

const ValidatorError = require('core/errors/factoryError')('ValidatorError');
const MapFileType = require('core/repositories/maps/mapFileType');


// TODO - Figure out a better way to validate files.
const validateFile = (file, opts) => {

    const defaultParams = {
        maxsize: process.env.MAESTRO_UPLOAD_MAXSIZE | 16302400, //~10 mb,
        minsize: process.env.MAESTRO_UPLOAD_MINSIZE | 1, // 1 kbs
        type: MapFileType().getFyleTypes()
    };

    const config = Object.assign({}, defaultParams, opts);
    const error = [];

    return {
        sizeValidate() {
            const size = file.size;

            if (size > config.minsize && size < config.maxsize) {
                return true;
            }

            error.push("File is to big");
            return false;
        },

        typeValidate() {
            const fileType = file.type;

            if (config.type.indexOf(fileType) > -1) {
                return true;
            }

            error.push("We only acceptable jpg, png, json and csv");
            return false;
        },

        pass() {
            return this.sizeValidate() && this.typeValidate();
        },

        check() {

            if (!this.typeValidate()) {
                const message = error.reduce((a, b) => `${a}, ${b}`);
                throw new ValidatorError(message);
            }
        }
    };

};

module.exports = validateFile;
