'use strict';
require('app-module-path').addPath(`${__dirname}/../../app`); //make more realiable to call modules

require('dotenv').config({path: '.env.test'});

let chai = require('chai'),
    {expect} = chai,
    sinon = require('sinon'),
    httpMocks = require('node-mocks-http'),
    ACCESS = require('core/entities/accessRole'),
    chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);


describe('unit - core', function () {

    /*
     ------------------------------------------------------- applications
     */

    it('applications - transform - baseurl', function () {
        process.env.BASEURL = "http://localhost:7878";
        const base = require('core/applications/transforms/helpers/base_url');

        expect(base).to.be.equal(process.env.BASEURL);
    });

    it('applications - transform - createLinkPagination', function (done) {
        const pag = require('core/applications/transforms/helpers/createLinkPagination');

        const obj = pag('tester', 1, 1, 2);

        expect(obj).to.be.a('object');
        expect(obj).to.have.property('_self');
        expect(obj).to.have.deep.property('prev');
        expect(obj).to.not.have.property('last');

        done();
    });

    it('applications - transform - createLinkPagination', function (done) {
        const pag = require('core/applications/transforms/helpers/createLinkPagination');

        const obj = pag('tester', 1, 3, 2);
        expect(obj).to.be.a('object');
        expect(obj).to.have.property('_self');
        expect(obj).to.have.deep.property('next');
        expect(obj).to.have.property('last');

        done();
    });

    it('applications - transform - factoryObjHateoas', function (done) {
        const fc = require('core/applications/transforms/helpers/factoryObjHateoas');

        const obj = fc('tester', 'localhost', 'POST');

        expect(obj).to.have.property('tester').to.have.property('href');
        expect(obj).to.have.property('tester').to.have.property('method', 'POST');

        done();
    });

    it('applications - transform - formatFirstRole - default values', function (done) {
        const fc = require('core/applications/transforms/formatFirstRole');

        const owner = {_id: "1564sada65", name: "MaestroTester", email: "maestro@maestro.com"};
        const role = ACCESS.ROLE_ADMIN;

        const obj = fc(owner, role);

        expect(obj).to.have.property('roles').with.lengthOf(1);
        expect(obj).to.have.nested.property('roles[0]._id', owner._id);
        expect(obj).to.have.nested.property('roles[0].name', owner.name);
        expect(obj).to.have.nested.property('roles[0].email', owner.email);
        expect(obj).to.have.nested.property('roles[0].role', role);

        done();
    });

    it('applications - transform - formatFirstRole - all params', function (done) {
        const fc = require('core/applications/transforms/formatFirstRole');

        const owner = {_id: "1564sada65", name: "MaestroTester", email: "maestro@maestro.com"};
        const role = ACCESS.ROLE_WRITER;
        const fielder = 'members';

        const obj = fc(owner, role, fielder);

        expect(obj).to.have.property(fielder).with.lengthOf(1);
        expect(obj).to.have.nested.property(fielder+'[0]._id', owner._id);
        expect(obj).to.have.nested.property(fielder+'[0].name', owner.name);
        expect(obj).to.have.nested.property(fielder+'[0].email', owner.email);
        expect(obj).to.have.nested.property(fielder+'[0].role', role);
        done();
    });

    it('applications - transform - hateoasTransform - accessSingleRoleRefs', function (done) {
        const {accessSingleRoleRefs} = require('core/applications/transforms/hateoasTransform');

        const collections = {
          name: "Tester name obj",
          myRoler: [
            {'role': 1, 'name': "Namer", 'refs': "users"}
          ]
        };

        const Entity = {access: "myRoler", name: "roler"};
        const obj = accessSingleRoleRefs(collections, 123, Entity);

        expect(obj).to.have.property('items').with.lengthOf( collections[Entity.access].length);
        expect(obj).to.have.nested.property('items', collections[Entity.access]);
        done();
    });

    it('applications - transform - hateoasTransform - collectionTransform', function (done) {
        const {collectionTransform} = require('core/applications/transforms/hateoasTransform');

        const collections = [{
          name: "Tester name obj",
          myRoler: [
            {'role': 1, 'name': "Namer", 'refs': "users"},
            {'role': 7, 'name': "Namer2", 'refs': "teams"}
          ]
        }];

        const Entity = {access: "myRoler", name: "roler"};
        const obj = collectionTransform(collections, collections.length, Entity, 20, 1);

        expect(obj).to.have.property('items').with.lengthOf(collections.length);
        expect(obj).to.have.property('found', 1);
        expect(obj).to.have.property('total_pages', 1);
        expect(obj).to.have.property('limit', 20);
        expect(obj).to.have.property('_links').to.be.a('object');
        expect(obj).to.have.property('current_page', 1);
        expect(obj).to.have.property('items').to.be.a('array');
        done();
    });

    it('applications - transform - hateoasTransform - singleTransform', function (done) {
        const {singleTransform} = require('core/applications/transforms/hateoasTransform');

        const collections = {
          name: "Tester name obj",
          myRoler: [
            {'role': 1, 'name': "Namer", 'refs': "users"}
          ]
        };

        const Entity = {access: "myRoler", name: "roler"};
        const obj = singleTransform(collections, Entity);

        expect(obj).to.have.property('_links').to.be.a('object');
        expect(obj).to.have.property('name', collections.name);
        expect(obj).to.have.property('myRoler').with.lengthOf(collections.myRoler.length);
        done();
    });

    it('applications - validator - validAccessEmpty', function (done) {
        const validAccess = require('core/applications/validator/validAccessEmpty');

        expect(validAccess({})).to.be.rejected.notify(done);
    });

    it('applications - validator - validAccessEmpty', function (done) {
        const validAccess = require('core/applications/validator/validAccessEmpty');

        expect(validAccess({name:"Something"})).to.eventually.have.property("name").notify(done);
    });

    it('applications - validator - validNotFound', function (done) {
        const validNotFound = require('core/applications/validator/validNotFound');
        expect(validNotFound({}, 10, 10, 2)).to.be.rejected.notify(done);
    });

    it('applications - validator - validNotFound', function (done) {
        const validNotFound = require('core/applications/validator/validNotFound');
        expect(validNotFound({name: "Something"}, 10, 30, 2)).to.eventually.have.property("name").notify(done);
    });

    it('applications - accessApplication', function (done) {
        done();
    });

    describe('persistenceApplication', function () {
      const Entity = {name: "Tester", access: "roler"};
      const Entity2 = {name: "Tester2"};

      const PersistenceServices = require('core/services/PersistenceServices');
      const PersistenceApp = require('core/applications/persistenceApplication');

      let res = httpMocks.createResponse();
      let req = httpMocks.createRequest({
          method: 'GET',
          query: {
            foo: "bar"
          },
          user: {
            _id: "452ed4a4f4421335e032bf09",
            name: "Signorini"
          }
      });

      it('applications - persistenceApplication', function(done) {
          let SPS = sinon.stub().returns({find:(e)=>console.log(e)});
          let rqs = sinon.spy(res, 'json');
          let next = sinon.spy();

          PersistenceApp(Entity, SPS).find(req, res, next);

//console.log(SPS);
console.log(next.calledOnce);
          sinon.assert.calledOnce(rqs);

          SPS.restore();
          done();
      });
    });



    it('applications - uploadApplication', function (done) {
        done();
    });

    it('applications - wrapperPersistenceApplication', function (done) {
        done();
    });

    /*
     ------------------------------------------------------- libs
     */

    describe('libs', function () {
        it('Welcome msg', function (done) {
            done();
        });
    });

    /*
     ------------------------------------------------------- middlewares
     */

    describe('middlewares', function () {
        it('Welcome msg', function (done) {
            done();
        });
    });

    /*
     ------------------------------------------------------- repositories
     */

    describe('repositories', function () {
        it('Welcome msg', function (done) {
            done();
        });
    });

    /*
     ------------------------------------------------------- services
     */

    describe('services', function () {
        it('Welcome msg', function (done) {
            done();
        });
    });

    /*
     ------------------------------------------------------- validators
     */

    describe('validators', function () {
        it('Welcome msg', function (done) {
            done();
        });
    });


});
