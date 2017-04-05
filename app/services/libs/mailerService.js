
import mailerConnector from '../../repositories/smtp/mailerConnector';

class mailerService {

    constructor() {

        return this;
    }


    sender(to, subject, template) {

        return new Promise((resolve, reject) => {

            mailerConnector.sender();

        });

    }
}

module.exports = mailerService;
