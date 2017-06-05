'use strict';

const Mailer = require('./factoryMailer');


class mailerConnector {

    constructor() {
        this.mailer = new Mailer();

        this.mailer
            .connect()
            .catch((err) => {
                console.log(err);
            });
    }

    sender(to, subject, html, data, text="") {
      if(!this.mailer.isConnected()) {
         throw new Error("Smtp'inst connect");
      }

      return new Promise((resolve, reject) => {

            this.mailer.transporter.sendMail(
              this.makeEnvelop(to, subject, html, data, text),
              (err) => {
                if(err){
                  reject(err);
                }

                resolve(true);
              }
            );

      });
    }

    makeEnvelop (to, subject, html, data, text) {

      return {
          from: process.env.SMTP_SENDER,
          to,
          subject,
          text,
          template: html,
          context: data
      };

    }

}

const instance = new mailerConnector();
Object.freeze(instance);

module.exports = instance;
