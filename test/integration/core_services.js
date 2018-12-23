'use strict';
require('app-module-path').addPath(`${__dirname}/../../app`); //make more realiable to call modules

require('dotenv').config({path: '.env.test'});

let chai = require('chai'),
    {expect} = chai,
    sinon = require('sinon'),
    chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);


describe('unit - core', function () {

    describe('Hooks', function () {

        describe('services HTTPService', function () {
            it('test find', function (done) {
                const {HTTPService} = require('core/services/HTTPService');
                let result = HTTPService('http://httpstat.us')().find('/');

                expect(result)
                    .to.be.fulfilled
                    .and.notify(done);
            });

            it('test create', function (done) {
                const {HTTPService} = require('core/services/HTTPService');
                let result = HTTPService('http://httpstat.us')().create('/');

                expect(result)
                    .to.be.fulfilled
                    .and.notify(done);
            });


            it('test update', function (done) {
                const {HTTPService} = require('core/services/HTTPService');
                let result = HTTPService('http://httpstat.us')().update('/');

                expect(result)
                    .to.be.fulfilled
                    .and.notify(done);
            });

            it('test remove', function (done) {
                const {HTTPService} = require('core/services/HTTPService');
                let result = HTTPService('http://httpstat.us')().remove('/');

                expect(result)
                    .to.be.fulfilled
                    .and.notify(done);
            });
        });

    });


});
