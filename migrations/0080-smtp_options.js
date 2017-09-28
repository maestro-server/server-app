'use strict';


exports.up = function (db, next) {
    let pets = db.collection('adminer');
    pets.insert({
        "value": {
            environment: ['Production', 'Staging', 'Development', 'UTA', 'Training', 'SandBox'],
            third: ['MailChimp', 'SendGrid', 'SES (AWS)', 'Mailgun', 'Postmark', 'Sender', 'Mailjet', 'Elastic Email', 'Userfox', 'Lob', 'outMail', 'SendBulls', 'GetResponse', 'Constant Contact', 'Emma', 'iContact', 'SendInBlue', 'E-goi', 'Exact Target', 'Locaweb SMTP'],
            own: ['Postfix', 'Exim', 'Sendmail', 'Haraka', 'Courier-MTA', 'Microsoft SMTP Server (Exchange)', 'PowerMTA', 'OpenSMTPD', 'Dragonfly Mail Agent', 'sSMTP', 'MailerQ', 'Hectane', 'BulkMTA']
        },
        "key": "smtp_options",
        "active": true,
        "updated_at": new Date()
    }, next);
};

exports.down = function (db, next) {
    let pets = db.collection('adminer');

    pets.findAndModify({key: 'smtp_options'}, [], {}, {remove: true}, next);
};
