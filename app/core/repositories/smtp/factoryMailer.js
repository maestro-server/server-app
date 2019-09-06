'use strict';

const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
const templatepath = process.cwd()+"/templates/emkts/";

const factoryMailer = {
    transporter: false,


    options: {viewPath: templatepath, extName: ".hbs", viewEngine: {partialsDir: templatepath}},

    connected: false,

    connect() {

        const smtpConfig = {
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            ignoreTLS: process.env.SMTP_IGNORE
        };

        if(process.env.SMTP_USETLS) {
            Object.assign(smtpConfig, {
                secure: process.env.SMTP_USETLS,
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
