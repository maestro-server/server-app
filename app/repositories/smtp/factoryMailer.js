const nodemailer = require('nodemailer');

class factoryMailer {

    constructor() {
        this.connected = false;
        this.transporter;
        return this;
    }

    connect() {

        let smtpConfig = {
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: process.env.SMTP_USETSL,
            auth: {
                user: process.env.SMTP_USERNAME,
                pass: process.env.SMTP_PASSWORD
            }
        };


        return new Promise((resolve, reject) => {

            const transporter = nodemailer.createTransport(smtpConfig);
            this.transporter = transporter;

            transporter.verify((error, success) => {
                if (success) {
                    this.connected = success;
                    resolve(transporter);
                }
                reject(error);
            });

        });

    }

    isConnected() {
        return this.connected;
    }

}

module.exports = factoryMailer;
