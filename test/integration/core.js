'use strict';
require('app-module-path').addPath(`${__dirname}/../../app`); //make more realiable to call modules

require('dotenv').config({path: '.env.test'});

let chai = require('chai'),
    {expect} = chai,
    sinon = require('sinon'),
    chaiAsPromised = require("chai-as-promised"),
    sinonStubPromise = require('sinon-stub-promise'),
    cleaner_db = require('../e2e/libs/cleaner_db'),
    _ = require('lodash');

chai.use(chaiAsPromised);
sinonStubPromise(sinon);


describe('integration - core', function () {

  describe('repositories', function () {

    it('smtp - mailerConnection', function (done) {
        const conn = require('core/repositories/smtp/mailerConnector');

        const to = "felipeklerk@yahoo.com.br";
        const subject = "Felipe";
        const template = "forgot";

        const tt = conn.sender(to, subject, template);

        expect(tt).to.be.fulfilled;
        expect(tt).notify(done);
    });


    it('smtp - factoryMailer', function (done) {
        const Mailer = require('core/repositories/smtp/factoryMailer');

        const tt = Mailer.connect();

        expect(tt).to.be.fulfilled;
        expect(tt).notify(done);
    });

    it('smtp - factoryMailer - isConnected', function (done) {
        const Mailer = require('core/repositories/smtp/factoryMailer');
        const async = require('core/libs/db_run');

        const mailer = Mailer;

        if(!mailer.isConnected()) {
          async(function *() {
            yield mailer
                .connect();
          });
        }

        const test = Mailer.isConnected();

        expect(test).to.be.equal(true);
        done();
    });

    describe('DBRepository', function () {
      const Entity = require('./libs/entities/Tester');
      const DBRepository = require('core/repositories/DBRepository');
      let app = require('./libs/bootApp');

      const data = {name: "name", notHave: "notHave"};

      before(function (done) {
        cleaner_db([{tb: 'tester'}], () => {
          app(done);
        }, null);
      });


      describe('create', function () {
        it('create', function (done) {
            const tt = DBRepository(Entity).create(data);

            expect(tt).to.fulfilled
            .and.to.eventually.have.property("name")
            .and.to.eventually.not.have.property("notHave")
            .and.notify(done);
        });

        it('create 2', function (done) {
          const post = {name: "name2"};

            const tt = DBRepository(Entity).create(_.assign({}, data, post));

            expect(tt).to.fulfilled
            .and.to.eventually.have.property("name")
            .and.to.eventually.not.have.property("notHave")
            .and.notify(done);

        });
      });

      describe('find', function () {
        it('find', function (done) {
            const tt = DBRepository(Entity).find({}, 1, 1);

            expect(tt).to.eventually.have.nested.lengthOf(1);

            expect(tt)
            .to.be.fulfilled
            .and.to.eventually.have.nested.property("[0].name")
            .and.notify(done);
        });
      });

      describe('update', function () {
        it('find', function (done) {
           const {name} = data;
            const tt = DBRepository(Entity).update({name}, {name: "change"});

            expect(tt)
            .to.be.fulfilled
            .and.to.eventually.have.property("name")
            .and.notify(done);
        });
      });

      describe('test update', function () {
        it('findOne', function (done) {
            const tt = DBRepository(Entity).findOne({name: "change"});

            expect(tt)
            .to.be.fulfilled
            .and.to.eventually.have.property("name")
            .and.notify(done);
        });
      });
    });


  });

});
