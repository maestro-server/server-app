'use strict';

const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');

const factoryMailer = {
    transporter: false,

    options: {viewPath: process.cwd()+"/templates/emkts/", extName: ".hbs"},

    connected: false,

    connect() {

        let smtpConfig = {
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            ignoreTLS: process.env.SMTP_IGNORE
        };

        if(process.env.SMTP_USETSL) {
            Object.assign(smtpConfig, {
                secure: process.env.SMTP_USETSL,
                auth: {
                    user: process.env.SMTP_USERNAME,
                    pass: process.env.SMTP_PASSWORD
                }
            });
        }


        return new Promise((resolve, reject) => {

            const transporter = nodemailer.createTransport(smtpConfig);

            transporter.use('compile', hbs(this.options));

            this.transporter = transporter;

            transporter.verify((error, success) => {
                if (success) {
                    this.connected = success;
                    resolve(transporter);
                }
                reject(error);
            });

        });

    },

    isConnected() {
        return this.connected;
    }
};

module.exports = factoryMailer;
