'use strict';
require('app-module-path').addPath(`${__dirname}/../../app`); //make more realiable to call modules

require('dotenv').config({path: '.env.test'});

let chai = require('chai'),
    chaid = require('chaid'),
    {expect} = chai,
    sinon = require('sinon'),
    chaiAsPromised = require("chai-as-promised"),
    sinonStubPromise = require('sinon-stub-promise'),
    _ = require('lodash');

chai.use(chaiAsPromised);
chai.use(chaid);
sinonStubPromise(sinon);


describe('unit - core', function () {

    /*
     ------------------------------------------------------- libs
     */

    it('libs - crypto', function (done) {
        const crypto = require('core/libs/crypto');
        const text = "my tester";
        const encrypt = crypto.encrypt(text);
        const decrypty = crypto.decrypt(encrypt);

        expect(encrypt).to.be.a('string');
        expect(decrypty).to.equal(text);

        done();
    });

    it('libs - factoryPromises', function (done) {
        const factory = require('core/libs/factoryPromisefy');
        const text = "Texter";

        const promise = (txt) => (new Promise((resolve, reject) => {
            txt ? resolve(txt) : reject(err);
        }));

        const fact = factory(() => promise(text));

        expect(fact).to.eventually.equal(text);
        expect(fact).to.fulfilled.and.notify(done);
    });

    it('libs - factoryPromises - reject', function (done) {
        const factory = require('core/libs/factoryPromisefy');
        const text = false;

        const promise = (txt) => (new Promise((resolve, reject) => {
            txt ? resolve(txt) : reject(txt);
        }));

        const fact = factory(() => promise(text));

        expect(fact).be.rejected.and.notify(done);
    });

    it('libs - factoryValid', function (done) {
        const fValid = require('core/libs/factoryValid');
        const Joi = require('joi');

        const data = {name: "Felipe", email: "felipeklerk@yahoo.com.br"};
        const scheme = Joi.object().keys({
            name: Joi.string().required(),
            email: Joi.string().email()
        });

        const valid = fValid(data, scheme);

        expect(valid).to.be.a('boolean');
        done();
    });

    it('libs - factoryValid - invalid', function (done) {
        const fValid = require('core/libs/factoryValid');
        const Joi = require('joi');

        const data = {email: "felipeklerk"};
        const scheme = Joi.object().keys({
            name: Joi.string().required(),
            email: Joi.string().email()
        });

        expect(function () {
            fValid(data, scheme, "Validator");
        }).to.throw("Validator");
        done();
    });

    it('libs - db run', function (done) {
        const cor = require('core/libs/db_run');

        expect(function () {
            cor(function *() {
                yield Promise.resolve(true);
            });

        }).to.not.throw("Validator");
        done();
    });

    it('libs - db run - error', function (done) {
        const cor = require('core/libs/db_run');

        expect(function () {
            cor(function *() {
                yield Promise.reject();
            });
        }).to.not.throw();
        done();
    });

    it('libs - in_maker - single str', function (done) {
        const {ObjectId} = require('mongorito');
        const inMaker = require('core/libs/in_maker');
        const str = "5a32943514ea552585daf6b1";

        expect(inMaker(str))
            .to.have.id(new ObjectId(str));

        expect(inMaker(str) instanceof ObjectId).to.be.true;
        done();
    });

    it('libs - in_maker - array str', function (done) {
        const {ObjectId} = require('mongorito');
        const inMaker = require('core/libs/in_maker');

        const setup = ["5a32943514ea552585daf6b1", "5a32943514ea552585daf6b2", "5a32943514ea552585daf6b3"];
        const compare = [
            new ObjectId("5a32943514ea552585daf6b1"),
            new ObjectId("5a32943514ea552585daf6b2"),
            new ObjectId("5a32943514ea552585daf6b3")];

        expect(inMaker(setup))
            .to.have.property('$in')
            .to.same.ids(compare);

        expect(inMaker(setup)['$in'][0] instanceof ObjectId).to.be.true;
        expect(inMaker(setup)['$in'][1] instanceof ObjectId).to.be.true;
        expect(inMaker(setup)['$in'][2] instanceof ObjectId).to.be.true;
        done();
    });

    it('libs - request', function (done) {
        const fc = require('core/libs/request');
        const url = "http://google.com.br"

        const result = fc(url);

        expect(result).to.have.property('get'); // axios object
        expect(result).to.have.property('post');
        expect(result).to.have.property('patch');
        done();
    });

    it('libs - run migrate', function (done) {
        const fc = require('core/libs/run_migrate');

        expect(function(){
            fc({})
        }).to.not.throw('error');
        done();
    });



});
