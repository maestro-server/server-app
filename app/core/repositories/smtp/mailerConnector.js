'use strict';

const DMailer = require('./factoryMailer');
const async = require('core/libs/db_run');

const mailerConnector = (Mailer = DMailer) => {

  const mailer = Mailer;

  if(!mailer.isConnected() && process.env.SMTP_HOST) {
    async(function *() {
      yield mailer
          .connect();
    });
  }

  return {
    sender(to, subject, template, context, text="") {

      return new Promise((resolve, reject) => {
        const from = process.env.SMTP_SENDER;

            mailer.transporter.sendMail(
              {from, to, subject, text, template, context},
              (err) => {
                if(err){
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
