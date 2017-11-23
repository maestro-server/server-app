'use strict';

const _ = require('lodash');
const DMailer = require('./factoryMailer');
const async = require('core/libs/db_run');

const factoryValid = require('core/libs/factoryValid');
const smtpValid = require('core/validators/smtp_valid');

const ResourceError = require('core/errors/factoryError')('ResourceError');

const mailerConnector = (Mailer = DMailer) => {

    const mailer = Mailer;

    if (!mailer.isConnected()) {
        try {
            factoryValid(
                _.pick(process.env, ['SMTP_PORT', 'SMTP_HOST', 'SMTP_SENDER']),
                smtpValid
            );
        } catch(e) {
            throw new ResourceError(e);
        }

        async(function* () {
            yield mailer
                .connect();
        });
    }

    return {
        sender(to, subject, template, context, text = "") {

            return new Promise((resolve, reject) => {
                const from = process.env.SMTP_SENDER;

                mailer.transporter.sendMail(
                    {from, to, subject, text, template, context},
                    (err) => {
                        if (err) {
                            reject(err);
                        }

                        resolve(true);
                    }
                );
            });
        }
    };
};

module.exports = mailerConnector();
