'use strict';
require('app-module-path').addPath(`${__dirname}/../../app`); //make more realiable to call modules

require('dotenv').config({path: '.env.test'});

let chai = require('chai'),
    chaid = require('chaid'),
    {expect} = chai,
    chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);
chai.use(chaid);


describe('unit - identity', function () {


    it('identity - validator - validAccessService', function (done) {
        const validator = require('identity/services/validator/validAccessService');

        expect(function(){
            validator({isUpdater: {n: 30}});
        }).to.not.throw('error');
        done();
    });

    it('identity - validator - validAccessService - throw error', function (done) {
        const validator = require('identity/services/validator/validAccessService');

        expect(function(){
            return validator({});
        }).to.throw('error');

        done();
    });

    it('identity - validator - validPassMatch', function (done) {
        const validator = require('identity/services/validator/validPassMatch');
        const crypto = require('core/libs/crypto');
        const bcrypt = require('bcrypt');

        const password = bcrypt.hashSync('mystring', crypto.getCryptLevel());

        expect(validator('mystring')({password})).to.have.property('password');
        done();
    });

    it('identity - validator - validPassMatch - throw error', function (done) {
        const validator = require('identity/services/validator/validPassMatch');
        const crypto = require('core/libs/crypto');
        const bcrypt = require('bcrypt');

        const password = bcrypt.hashSync('mystring', crypto.getCryptLevel());

        expect(function(){
            expect(validator('notString')({password})).to.have.property('password');
        }).to.throw('error');
        done();
    });


});
