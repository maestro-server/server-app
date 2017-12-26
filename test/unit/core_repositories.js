'use strict';
require('app-module-path').addPath(`${__dirname}/../../app`); //make more realiable to call modules

require('dotenv').config({path: '.env.test'});

let chai = require('chai'),
    chaid = require('chaid'),
    {expect} = chai,
    sinon = require('sinon'),
    httpMocks = require('node-mocks-http'),
    ACCESS = require('core/entities/accessRole'),
    chaiAsPromised = require("chai-as-promised"),
    sinonStubPromise = require('sinon-stub-promise'),
    _ = require('lodash');

chai.use(chaiAsPromised);
chai.use(chaid);
sinonStubPromise(sinon);


describe('unit - core', function () {

    /*
     ------------------------------------------------------- repositories
     */

    it('repositories - maps - mapFileType', function (done) {
        const map = require('core/repositories/maps/mapFileType');

        const test1 = map("image/jpeg");
        const test2 = map("image/png");
        const test3 = map("default");

        expect(test1).to.equal('jpg');
        expect(test2).to.equal('png');
        expect(test3).to.equal('default');

        done();
    });

    it('repositories - transforms - activeFormat', function (done) {
        const format = require('core/repositories/transforms/activeFormat');

        expect(format.active()).to.have.property('active', true);
        expect(format.active()).to.not.have.property('active', false);
        done();
    });

    it('repositories - transforms - activeFormat - desactive', function (done) {
        const format = require('core/repositories/transforms/activeFormat');

        expect(format.desactive()).to.have.property('active', false);
        expect(format.desactive()).to.not.have.property('active', true);
        done();
    });

    it('repositories - transforms - findFilledFormat', function (done) {
        const format = require('core/repositories/transforms/findFilledFormat');

        const test1 = format({a: 1, b: 2, c: 3}, ['a', 'b']);

        expect(test1).to.have.property('a');
        expect(test1).to.have.property('active');
        expect(test1).to.have.property('b');
        expect(test1).to.not.have.property('c');
        done();
    });

    it('repositories - transforms - findFilledFormat - not have filter', function (done) {
        const format = require('core/repositories/transforms/findFilledFormat');

        const test1 = format({a: 1, b: 2, c: 3});
        expect(test1).to.have.property('active');

        expect(test1).to.not.have.property('a');
        expect(test1).to.not.have.property('b');
        expect(test1).to.not.have.property('c');
        done();
    });

    it('repositories - validator - validAccessUpdater', function (done) {
        const validator = require('core/repositories/validator/validAccessUpdater');

        expect(function(){
           validator({isUpdater: {n: 30}});
        }).to.not.throw('error');
        done();
    });

    it('repositories - validator - validAccessUpdater - throw error', function (done) {
        const validator = require('core/repositories/validator/validAccessUpdater');


        expect(function(){
           return validator({isUpdater: {n: 0}});
        }).to.throw('error');

        done();
    });


});
