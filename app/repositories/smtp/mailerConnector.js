const Mailer = require('./factoryMailer');


class mailerConnector {

    constructor() {

        this.mailer = new Mailer()

        this.mailer
            .connect()
            .catch((err) => {
                console.log(err);
            });
    }

    sender() {
        console.log(this.mailer.isConnected());
    }


}

const instance = new mailerConnector();
Object.freeze(instance);

export default instance;
