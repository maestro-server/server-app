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

        const test1 = validator({isUpdater: {n: 30}});

        expect(test1).to.eventually.have.property("isUpdater").notify(done);
    });

    it('repositories - validator - validAccessUpdater - throw error', function (done) {
        const validator = require('core/repositories/validator/validAccessUpdater');

        const tt = validator({isUpdater: {n: 0}});
        expect(tt).to.be.rejectedWith("You dont have access");

        done();
    });
    /*
     ------------------------------------------------------- services
     */

    it('services - transforms - accessMergeTransform', function (done) {
        const transforms = require('core/services/transforms/accessMergeTransform');

        const owner = {name: "Tester", "_id": "452ed4a4f4421335e032bf09"};
        const fielder = 'roler';
        const access = 3;

        const tt = transforms(owner, fielder, {}, access);

        expect(tt).to.have.property(fielder)
            .to.have.property('$elemMatch')
            .to.have.property('_id');

        expect(tt).to.have.property(fielder)
            .to.have.property('$elemMatch')
            .to.have.property('role');

        done();
    });

    it('services - transforms - accessMergeTransform - makeAccess', function (done) {
        const transforms = require('core/services/transforms/accessMergeTransform');

        const owner = {name: "Tester", "_id": "452ed4a4f4421335e032bf09"};
        const fielder = 'roler';
        const access = 3;

        const tt = transforms.makeAccess(owner, fielder, access);

        expect(tt).to.have.property(fielder)
            .to.have.property('$elemMatch')
            .to.have.property('_id');

        expect(tt).to.have.property(fielder)
            .to.have.property('$elemMatch')
            .to.have.property('role');

        done();
    });

    it('services - validator - uploadValid - sizeValidate e typeValidate = true', function (done) {
        const uploadValid = require('core/services/validator/uploadValid');
        const file = {size: 7894454646, name: "tester", type: "jpg"};
        const tt = uploadValid(file);

        tt.sizeValidate();
        expect(tt.pass()).to.be.equal(false);

        done();
    });

    it('services - validator - uploadValid - typeValidate = false', function (done) {
        const uploadValid = require('core/services/validator/uploadValid');

        const file = {size: 2000, name: "tester", type: "image/jpeg"};
        const tt = uploadValid(file);

        expect(tt.pass()).to.be.equal(true);

        done();
    });

    it('services - validator - uploadValid - check', function (done) {
        const uploadValid = require('core/services/validator/uploadValid');
        const file = {size: 7894454646, name: "tester", type: "jpg"};
        const tt = uploadValid(file);

        expect(tt).to.be.a('object');
        expect(function () {
            tt.check();
        }).to.not.throw("Validator");

        done();
    });

    it('services - validator - validNotFound', function (done) {
        const valid = require('core/services/validator/validNotEqual');
        const tt = valid({name: "tester"}, "roler", "asd");

        expect(tt).to.have.property("roler")
            .to.have.property('$ne', "asd");

        done();
    });

    describe('services - PersistenceServices', function () {
        const Entity = {name: "Tester", access: "roler", filled: ['name']};
        const PersistenceServices = require('core/services/PersistenceServices');

        const owner = {name: "tester", _id: "452ed4a4f4421335e032bf09"};
        const _id = "452ed4a4f4421335e032bf09";

        it('find', function (done) {
            let find = sinon.stub().returnsPromise();
            let count = sinon.stub().returnsPromise();
            let SPS = sinon.stub()
                .returns({
                    find,
                    count
                });

            PersistenceServices(Entity, SPS).find({}, owner);
            expect(find.args[0][0]).to.be.property("roler")
                .to.have.property("$elemMatch");

            expect(count.args[0][0]).to.be.property("roler")
                .to.have.property("$elemMatch");

            sinon.assert.calledOnce(find);
            sinon.assert.calledOnce(count);
            sinon.assert.calledOnce(SPS);
            done();
        });

        it('findOne', function (done) {
            let findOne = sinon.stub().returnsPromise();
            let SPS = sinon.stub()
                .returns({
                    findOne
                });

            PersistenceServices(Entity, SPS).findOne(_id, owner);

            expect(findOne.args[0][0]).to.have.property("_id");
            sinon.assert.calledOnce(findOne);
            sinon.assert.calledOnce(SPS);
            done();
        });

        it('autocomplete', function (done) {
            let find = sinon.stub().returnsPromise();
            let count = sinon.stub().returnsPromise();
            let SPS = sinon.stub()
                .returns({
                    find,
                    count
                });

            PersistenceServices(Entity, SPS).autocomplete({complete: "name"}, owner);

            expect(find.args[0][0]).to.be.property("roler")
                .to.have.property("$elemMatch");

            expect(count.args[0][0]).to.be.property("roler")
                .to.have.property("$elemMatch");

            sinon.assert.calledOnce(find);
            sinon.assert.calledOnce(count);
            sinon.assert.calledOnce(SPS);
            done();
        });

        it('create', function (done) {
            let findOne = sinon.stub().returnsPromise();
            let SPS = sinon.stub()
                .returns({
                    findOne
                });

            PersistenceServices(Entity, SPS).findOne(_id, owner);

            expect(findOne.args[0][0]).to.have.property("_id");
            sinon.assert.calledOnce(findOne);
            sinon.assert.calledOnce(SPS);
            done();
        });

        it('update', function (done) {
            let update = sinon.stub().returnsPromise();
            let SPS = sinon.stub()
                .returns({
                    update
                });

            const post = {name: "teste", owner: {name: "notAlloow"}, password: "notAllow"};
            PersistenceServices(Entity, SPS).update(_id, post, owner);

            expect(update.args[0][2][0]).to.not.have.property("password");
            expect(update.args[0][2]).to.not.have.property("_id");
            expect(update.args[0][2]).to.have.all.deep.members(["name"]);

            expect(update.args[0][1]).to.have.property("name");
            expect(update.args[0][1]).to.have.property("owner");
            expect(update.args[0][1]).to.have.property("password");

            expect(update.args[0][0]).to.have.property("_id");
            expect(update.args[0][0]).to.have.property("roler");

            sinon.assert.calledOnce(update);
            sinon.assert.calledOnce(SPS);
            done();
        });

        it('remove', function (done) {
            let remove = sinon.stub().returnsPromise();
            let SPS = sinon.stub()
                .returns({
                    remove
                });

            PersistenceServices(Entity, SPS).remove(_id, owner);

            expect(remove.args[0][0]).to.have.property("_id");
            expect(remove.args[0][0]).to.have.property("roler");
            sinon.assert.calledOnce(remove);
            sinon.assert.calledOnce(SPS);
            done();
        });


    });


    describe('services - UploaderService', function () {
        const Entity = {name: "Tester", access: "roler", filled: ['name']};
        const UploaderService = require('core/services/UploaderService');

        const owner = {name: "tester", _id: "452ed4a4f4421335e032bf09"};

        it('uploadImage', function (done) {
            let upload = sinon.stub().returnsPromise();
            let SPS = sinon.stub()
                .returns({
                    upload
                });

            const filer = {
                filetype: "image/jpeg"
            };

            UploaderService(Entity, SPS).uploadImage(filer, owner);

            expect(upload.args[0][0]).to.have.equal(owner._id);
            sinon.assert.calledOnce(upload);
            sinon.assert.calledOnce(SPS);
            done();
        });


    });

    describe('services - AccessServices', function () {
        const Entity = {name: "Tester", access: "roler", filled: ['name']};
        const AccessServices = require('core/services/AccessServices');

        const owner = {name: "tester", _id: "452ed4a4f4421335e032bf09"};
        const _id = "452ed4a4f4421335e032bf09";

        it('addRoles', function (done) {
            let updateByPushUnique = sinon.stub().returnsPromise();
            let SPS = sinon.stub()
                .returns({
                    updateByPushUnique
                });

            const post = {role: "1", id: "452ed4a4f4421335e032bf09", name: "Tname", refs: "users"};

            AccessServices(Entity, SPS).addRoles(_id, post, owner);

            expect(updateByPushUnique.args[0][0]).to.have.property('_id');
            expect(updateByPushUnique.args[0][0]).to.have.property(Entity.access)
                .to.have.property('$elemMatch');

            expect(updateByPushUnique.args[0][1]).to.have.property('roler')
                .to.have.property('role', 1);

            expect(updateByPushUnique.args[0][1]).to.have.property('roler')
                .to.have.property('role', 1);


            expect(updateByPushUnique.args[0][2]).to.have.equal(Entity.access);

            sinon.assert.calledOnce(updateByPushUnique);
            sinon.assert.calledOnce(SPS);
            done();
        });

        it('updateRoles', function (done) {
            let updateByPull = sinon.stub().returnsPromise();
            let SPS = sinon.stub()
                .returns({
                    updateByPull
                });

            const post2 = {role: "3", refs: "users"};

            const Entity2 = {name: "Tester", access: "roler", filled: ['name', 'url']};
            AccessServices(Entity2, SPS).updateRoles(_id, _id, post2, owner);

            expect(updateByPull.args[0][0]).to.have.property('_id');
            expect(updateByPull.args[0][0]).to.have.property('roler');

            sinon.assert.calledTwice(SPS);
            sinon.assert.calledOnce(updateByPull);
            done();
        });


        it('deleteRoles', function (done) {
            let updateByPull = sinon.stub().returnsPromise();
            let SPS = sinon.stub()
                .returns({
                    updateByPull
                });


            AccessServices(Entity, SPS).deleteRoles(_id, _id, owner);

            expect(updateByPull.args[0][0]).to.have.property('_id');
            sinon.assert.calledOnce(SPS);
            sinon.assert.calledOnce(updateByPull);
            done();
        });


    });

    describe('services - MailerService', function () {
        const MailerService = require('core/services/MailerService');

        it('sender', function (done) {
            let sender = sinon.stub().returnsPromise();
            let SPS = {sender};

            const to = "felipe";
            const subject = "MySubject";
            const template = "ok";
            const data = {};

            MailerService(SPS).sender(to, subject, template, data);

            sinon.assert.calledWith(sender, to, subject, template, data);
            sinon.assert.calledOnce(sender);
            done();
        });


    });


});
