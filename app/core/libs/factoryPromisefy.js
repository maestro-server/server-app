"use strict";

module.exports = (Clousure) => {

    return new Promise((resolve, reject) => {

        Clousure()
            .then((e) => {
                resolve(e);
            })
            .catch((err) => {
                reject(err);
            });

    });

};
