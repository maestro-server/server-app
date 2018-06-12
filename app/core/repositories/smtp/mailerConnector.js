'use strict';

const _ = require('lodash');
const DMailer = require('./factoryMailer');
const async = require('core/libs/db_run');

const factoryValid = require('core/libs/factoryValid');
const smtpValid = require('core/validators/smtp_valid');

const mailerConnector = (mailer = DMailer) => {

    if (!mailer.isConnected()) {
        try {
            factoryValid(
                _.pick(process.env, ['SMTP_PORT', 'SMTP_HOST', 'SMTP_SENDER']),
                smtpValid
            );

            async(function *() {
                yield mailer.connect();
                console.log("Maestro: SMTP Connected");
            });
        } catch(e) {
            console.error("Maestro: SMTP Connections not found, maestro is not able to send any email.");
        }
    }

    return {
        sender(to, subject, template, context) {

            return new Promise((resolve, reject) => {
                if (!mailer.isConnected())
                    reject("Maestro: SMTP is not connected, maestro is not able to send any email.");

                const from = process.env.SMTP_SENDER;
                mailer.transporter.sendMail(
                    {from, to, subject, template, context},
                    (err) => {
                        if (err)
                            reject(err);

                        resolve(true);
                    }
                );
            });
        }
    };
};

module.exports = mailerConnector();
