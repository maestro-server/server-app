'use strict';

const DmailerConnector = require('core/repositories/smtp/mailerConnector');

const mailerService = (FmailerConnector = DmailerConnector) => {

  const mailerConnector = FmailerConnector;

    return {
        sender(to, subject, template, data) {

            return new Promise((resolve, reject) => {

                mailerConnector.sender(to, subject, template, data)
                    .then(resolve)
                    .catch(reject);
            });

        }
    };
};


module.exports = mailerService;
