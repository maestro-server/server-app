'use strict';
require('app-module-path').addPath(`${__dirname}/../../app`); //make more realiable to call modules

require('dotenv').config({path: '.env.test'});

let chai = require('chai'),
    chaid = require('chaid'),
    {expect} = chai,
    sinon = require('sinon'),
    chaiAsPromised = require("chai-as-promised"),
    cleaner_db = require('../e2e/libs/cleaner_db'),
    sinonStubPromise = require('sinon-stub-promise'),
    _ = require('lodash');

chai.use(chaiAsPromised);
chai.use(chaid);
sinonStubPromise(sinon);


describe('unit - core', function () {

    describe('Hooks', function () {
        const Entity = require('./libs/entities/Tester');
        let app = require('./libs/bootDB');

        const data = {name: "name", notHave: "notHave"};

        before(function (done) {
            cleaner_db([{tb: 'testers'}], () => {
                app(done);
            }, null);
        });

        describe('factory Hooks', function () {
            it('call relationInc hook, after_create', function (done) {
                const HookerEntity = {
                    hooks: {
                        after_create: {
                            relationInc: {
                                'Entity': Entity,
                                'field': 'increment',
                                'source': 'teams._id'
                            }
                        }
                    }
                };

                const data = {tester: 'testerpath'};

                const fc = require('core/hooks/factory');

                const result = fc(HookerEntity)('after_create')(data);
                expect(result).to.deep.equal(data);
                done();
            });

        });


        describe('relationInc', function () {
            it('exist source path', function (done) {
                const config = {
                    Entity,
                    field: "increment",
                    source: "teams._id"
                };

                const data = {
                    name: "teste result",
                    increment: 0,
                    teams: {_id: "452ed4a4f4421335e032bf09"}
                };

                const fc = require('core/hooks/relationInc');

                const result = fc(config)(data);

                expect(result).to.deep.equal({ [config.field]: 1 });
                done();
            });

            it('dont exist source path', function (done) {
                const config = {
                    Entity,
                    field: "increment",
                    source: "tester._id"
                };

                const data = {
                    increment: 0,
                    name: "teste result"
                };

                const fc = require('core/hooks/relationInc');

                const result = fc(config)(data);
                expect(result).to.be.equal(data);
                done();
            });
        });
    });


});
