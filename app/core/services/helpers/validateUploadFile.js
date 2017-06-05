'use strict';

const ValidatorError = require('../../errors/validatorError');

class validateFile {

    constructor(file, opts) {

        this.file = file;

        const defaultParams = {
            maxsize: 1630240, //~1 mb,
            minsize: 1024, // 1 kbs
            type: ["image/jpeg", "image/png"]
        };

        this.config = Object.assign({}, defaultParams, opts);
        this.error = [];
    }

    sizeValidate() {
        let size = this.file.size;

        if (size > this.config.minsize && size < this.config.maxsize) {
            return true;
        }

        this.error.push("File is to big");
        return false;
    }

    typeValidate() {
        let fileType = this.file.type;
        if (this.config.type.indexOf(fileType) > -1) {
            return true;
        }

        this.error.push("We only acceptable jpg or png");
        return false;
    }

    pass() {
        if (this.sizeValidate() && this.typeValidate()) {
            return true;
        }

        return false;
    }

    check() {
        return new Promise((resolve) => {

            if (!this.typeValidate()) {
                const message = this.error.reduce((a, b) => `${a}, ${b}`);
                throw new ValidatorError(message);
            }

            resolve();
        });
    }
}

module.exports = validateFile;
