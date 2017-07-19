"use strict";

module.exports = (Clousure) => {

    return new Promise((resolve, reject) => {

        Clousure()
            .then(resolve)
            .catch(reject);

    });

};
