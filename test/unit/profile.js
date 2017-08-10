'use strict';
require('app-module-path').addPath(`${__dirname}/../../app`); //make more realiable to call modules

require('dotenv').config({path: '.env.test'});

let chai = require('chai'),
    {expect} = chai,
    sinon = require('sinon'),
    chaiAsPromised = require("chai-as-promised"),
    sinonStubPromise = require('sinon-stub-promise');

chai.use(chaiAsPromised);
sinonStubPromise(sinon);


describe('unit - profile', function () {

    it('config - auth_config', function (done) {
        const config = require('identity/profile/config/auth_config');

        expect(config).to.have.property('jwtSecret')
            .to.have.property('secretOrKey');

        expect(config).to.have.property('jwtSession')
            .to.have.property('session', false);

        done();
    });

    it('config - auth_forgot_config', function (done) {
        const config = require('identity/profile/config/auth_forgot_config');

        expect(config).to.have.property('jwtSecret')
            .to.have.property('secretOrKey');

        expect(config).to.have.property('jwtSession')
            .to.have.property('session', false);

        done();
    });

    /*
     ------------------------------------------------------- services
     */
    it('services - libs - decodePassForgot', function (done) {
        const jwt = require('jwt-simple');
        const config = require('identity/profile/config/auth_forgot_config');
        const Crypto = require('core/libs/crypto');
        const user = "token";
        const crypt = Crypto.encrypt(JSON.stringify(user));
        const token = jwt.encode(crypt, config.jwtSecret.secretOrKey);
        const decode = require('identity/profile/services/libs/decodePassForgot');
        const res = decode({token});

        expect(res).to.fulfilled
            .and.to.eventually.equal(user)
            .and.notify(done);
    });

    it('services - libs - decodePassForgot - error is not token', function (done) {
        const jwt = require('jwt-simple');
        const config = require('identity/profile/config/auth_forgot_config');
        const Crypto = require('core/libs/crypto');
        const user = "token";
        const crypt = Crypto.encrypt(JSON.stringify(user));

        const token = jwt.encode(crypt, config.jwtSecret.secretOrKey);
        const decode = require('identity/profile/services/libs/decodePassForgot');
        const res = decode(token);

        expect(res).to.rejected
            .and.notify(done);
    });

    it('services - libs - decodePassForgot - test secret KEy', function (done) {
        const jwt = require('jwt-simple');
        const config = require('identity/profile/config/auth_config');
        const Crypto = require('core/libs/crypto');
        const user = "token";
        const crypt = Crypto.encrypt(JSON.stringify(user));

        const token = jwt.encode(crypt, config.jwtSecret.secretOrKey);
        const decode = require('identity/profile/services/libs/decodePassForgot');
        const res = decode({token});

        expect(res).to.rejected
            .and.notify(done);
    });


    /*
     ------------------------------------------------------- trasnforms
     */

});
