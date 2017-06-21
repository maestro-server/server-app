'use strict';

const ValidatorError = require('core/errors/validatorError');

const validateFile = (file, opts) => {

    const defaultParams = {
        maxsize: 1630240, //~1 mb,
        minsize: 1024, // 1 kbs
        type: ["image/jpeg", "image/png"]
    };

    const config = Object.assign({}, defaultParams, opts);
    let error = [];

    return {
        sizeValidate() {
            let size = file.size;

            if (size > config.minsize && size < config.maxsize) {
                return true;
            }

            error.push("File is to big");
            return false;
        },

        typeValidate() {
            let fileType = file.type;
            if (config.type.indexOf(fileType) > -1) {
                return true;
            }

            error.push("We only acceptable jpg or png");
            return false;
        },

        pass() {
            if (this.sizeValidate() && this.typeValidate()) {
                return true;
            }

            return false;
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
