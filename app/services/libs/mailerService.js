
import mailerConnector from '../../repositories/smtp/mailerConnector';

class mailerService {

    constructor() {
        return this;
    }


    sender(to, subject, template, data) {

        return new Promise((resolve, reject) => {

            mailerConnector.sender(to, subject, template, data)
            .then((e) => resolve(e))
            .catch((err) => {
                reject(err);
            });

        });

    }
}

module.exports = mailerService;
