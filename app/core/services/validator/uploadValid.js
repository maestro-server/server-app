'use strict';

const ValidatorError = require('core/errors/factoryError')('ValidatorError');

const validateFile = (file, opts) => {

    const defaultParams = {
        maxsize: 1630240, //~1 mb,
        minsize: 1024, // 1 kbs
        type: ["image/jpeg", "image/png"]
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

            error.push("We only acceptable jpg or png");
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
