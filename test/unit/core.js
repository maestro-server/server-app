'use strict';
require('app-module-path').addPath(`${__dirname}/../../app`); //make more realiable to call modules

require('dotenv').config({path: '.env.test'});

let chai = require('chai'),
    {expect} = chai,
    sinon = require('sinon'),
    httpMocks = require('node-mocks-http'),
    ACCESS = require('core/entities/accessRole'),
    chaiAsPromised = require("chai-as-promised"),
    sinonStubPromise = require('sinon-stub-promise'),
    _ = require('lodash');

chai.use(chaiAsPromised);
sinonStubPromise(sinon);


describe('unit - core', function () {

    /*
     ------------------------------------------------------- applications
     */

    it('applications - transform - baseurl', function () {
        process.env.BASEURL = "http://localhost:8888";
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
        expect(obj).to.have.nested.property(fielder + '[0]._id', owner._id);
        expect(obj).to.have.nested.property(fielder + '[0].name', owner.name);
        expect(obj).to.have.nested.property(fielder + '[0].email', owner.email);
        expect(obj).to.have.nested.property(fielder + '[0].role', role);
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

        expect(obj).to.have.property('items').with.lengthOf(collections[Entity.access].length);
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

        expect(validAccess({name: "Something"})).to.eventually.have.property("name").notify(done);
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

    describe('applications - accessApplication', function () {
        const Entity = {name: "Tester", access: "roler"};

        const AccessApp = require('core/applications/accessApplication');

        let res = httpMocks.createResponse();
        let req = httpMocks.createRequest({
            query: {
                foo: "bar"
            },
            user: {
                _id: "452ed4a4f4421335e032bf09",
                name: "Signorini"
            },
            params: {
                id: "34233628",
                idu: "88459349"
            },
            body: {
                name: "MyBody"
            }
        });


        it('update', function (done) {
            let updateRoles = sinon.stub().returnsPromise();
            let SPS = sinon.stub()
                .returns({
                    updateRoles
                });

            AccessApp(Entity, SPS).update(req, res);

            sinon.assert.calledWithExactly(updateRoles, req.params.id, req.params.idu, req.body, req.user);
            sinon.assert.calledOnce(updateRoles);
            sinon.assert.calledOnce(SPS);
            done();
        });

        it('create', function (done) {
            let addRoles = sinon.stub().returnsPromise();
            let SPS = sinon.stub()
                .returns({
                    addRoles
                });
            AccessApp(Entity, SPS).create(req, res);


            sinon.assert.calledWithExactly(addRoles, req.params.id, req.body, req.user);
            sinon.assert.calledOnce(addRoles);
            sinon.assert.calledOnce(SPS);

            done();
        });

        it('remove', function (done) {
            let deleteRoles = sinon.stub().returnsPromise();
            let SPS = sinon.stub()
                .returns({
                    deleteRoles
                });

            AccessApp(Entity, SPS).remove(req, res);

            sinon.assert.calledWithExactly(deleteRoles, req.params.id, req.params.idu, req.user);
            sinon.assert.calledOnce(deleteRoles);
            sinon.assert.calledOnce(SPS);

            done();
        });


    });

    describe('applications - persistenceApplication', function () {
        const Entity = {name: "Tester", access: "roler"};

        const PersistenceApp = require('core/applications/persistenceApplication');

        let res = httpMocks.createResponse();
        let req = httpMocks.createRequest({
            query: {
                foo: "bar"
            },
            user: {
                _id: "452ed4a4f4421335e032bf09",
                name: "Signorini"
            },
            params: {
                id: "34233628"
            },
            body: {
                name: "MyBody"
            }
        });

        it('find', function (done) {
            let find = sinon.stub().returnsPromise();
            let SPS = sinon.stub()
                .returns({
                    find
                });

            PersistenceApp(Entity, SPS).find(req, res);

            sinon.assert.calledWithExactly(find, {foo: "bar", limit: 20, page: 1}, req.user);
            sinon.assert.calledOnce(find);
            sinon.assert.calledOnce(SPS);

            done();
        });

        it('find - rq2', function (done) {
            let find = sinon.stub().returnsPromise();
            let SPS = sinon.stub()
                .returns({
                    find
                });

            let req2 = httpMocks.createRequest({
                user: {_id: "asd"}
            });

            PersistenceApp(Entity, SPS).find(req2, res);

            sinon.assert.calledWithExactly(find, {limit: 20, page: 1}, req2.user);
            sinon.assert.calledOnce(SPS);

            done();
        });

        it('findOne', function (done) {
            let findOne = sinon.stub().returnsPromise();
            let SPS = sinon.stub()
                .returns({
                    findOne
                });

            PersistenceApp(Entity, SPS).findOne(req, res);

            sinon.assert.calledWithExactly(findOne, req.params.id, req.user);
            sinon.assert.calledOnce(findOne);
            sinon.assert.calledOnce(SPS);

            done();
        });

        it('autocomplete', function (done) {
            let autocomplete = sinon.stub().returnsPromise();
            let SPS = sinon.stub()
                .returns({
                    autocomplete
                });

            PersistenceApp(Entity, SPS).autocomplete(req, res);

            sinon.assert.calledWithExactly(autocomplete, req.query, req.user);
            sinon.assert.calledOnce(autocomplete);
            sinon.assert.calledOnce(SPS);

            done();
        });

        it('update', function (done) {
            let update = sinon.stub().returnsPromise();
            let SPS = sinon.stub()
                .returns({
                    update
                });

            PersistenceApp(Entity, SPS).update(req, res);

            sinon.assert.calledWithExactly(update, req.params.id, req.body, req.user);
            sinon.assert.calledOnce(update);
            sinon.assert.calledOnce(SPS);

            done();
        });

        it('create', function (done) {
            let create = sinon.stub().returnsPromise();
            let SPS = sinon.stub()
                .returns({
                    create
                });
            PersistenceApp(Entity, SPS).create(req, res);

            let body = _.merge(
                req.body,
                {owner: _.merge(req.user, {refs: 'users'})},
                {[Entity.access]: [_.merge(req.user, {role: 7})]}
            );

            sinon.assert.calledWithExactly(create, body);
            sinon.assert.calledOnce(create);
            sinon.assert.calledOnce(SPS);

            done();
        });

        it('create - filter', function (done) {
            let create = sinon.stub().returnsPromise();
            let SPS = sinon.stub()
                .returns({
                    create
                });

            let req2 = httpMocks.createRequest({
                user: {_id: "abc", refs: "teams", notHave: "nothave"},
                body: {name: "body2"}
            });

            PersistenceApp(Entity, SPS).create(req2, res);

            let body = _.merge(
                req2.body,
                {owner: _.merge(req2.user, {refs: 'teams'})},
                {[Entity.access]: [_.merge(req2.user, {role: 7})]}
            );

            sinon.assert.calledWithExactly(create, body);
            sinon.assert.calledOnce(create);
            sinon.assert.calledOnce(SPS);

            expect(create.args[0]).to.not.deep.equal(body); // test filter args, can not have 'notHave' arg


            done();
        });

        it('create - witouh access entity', function (done) {
            const create = sinon.stub().returnsPromise();
            let SPS = sinon.stub()
                .returns({
                    create
                });

            let req3 = httpMocks.createRequest({
                user: req.user,
                body: req.body
            });

            const Entity2 = {name: "Oh"};
            PersistenceApp(Entity2, SPS).create(req3, res);

            sinon.assert.calledOnce(create);
            sinon.assert.calledOnce(SPS);

            expect(create.args[0][0]).to.equal(req3.body);

            done();
        });

        it('remove', function (done) {
            let remove = sinon.stub().returnsPromise();
            let SPS = sinon.stub()
                .returns({
                    remove
                });

            PersistenceApp(Entity, SPS).remove(req, res);

            sinon.assert.calledWithExactly(remove, req.params.id, req.user);
            sinon.assert.calledOnce(remove);
            sinon.assert.calledOnce(SPS);

            done();
        });


    });

    describe('applications - uploadApplication', function () {
        const Entity = {name: "Tester", access: "roler"};

        const AccessApp = require('core/applications/uploadApplication');

        let res = httpMocks.createResponse();
        let req = httpMocks.createRequest({
            query: {
                foo: "bar"
            },
            user: {
                _id: "452ed4a4f4421335e032bf09",
                name: "Signorini"
            }
        });


        it('uploader', function (done) {
            let uploadImage = sinon.stub().returnsPromise();
            let SPS = sinon.stub()
                .returns({
                    uploadImage
                });

            AccessApp(Entity, SPS).uploader(req, res);

            sinon.assert.calledWithExactly(uploadImage, req.query, req.user);
            sinon.assert.calledOnce(uploadImage);
            sinon.assert.calledOnce(SPS);
            done();
        });

    });


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

        const promise = new Promise((resolve) => {
            if (resolve) {
                resolve(resolve);
            } else {
                reject(err);
            }
        });

        factory(promise(text)).resolves(text);

        expect(factory(promise(text)).resolved).to.eql('resolve value');

        done();
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
