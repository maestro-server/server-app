'use strict';

const FmailerConnector = require('core/repositories/smtp/mailerConnector');

const mailerService = (mailerConnector = FmailerConnector) => {

    return {
        sender(to, subject, template, data) {

            return new Promise((resolve, reject) => {

                mailerConnector.sender(to, subject, template, data)
                    .then((e) => resolve(e))
                    .catch((err) => {
                        reject(err);
                    });

            });

        }
    };
}


module.exports = mailerService;
