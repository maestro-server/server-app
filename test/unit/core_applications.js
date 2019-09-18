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
    _ = require('lodash');

chai.use(chaiAsPromised);
chai.use(chaid);


describe('unit - core', function () {

    /*
     ------------------------------------------------------- applications
     */

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

    it('applications - transform - aclRoles', function (done) {
        const fc = require('core/applications/transforms/aclRoles');
        const Entity = {access: 'roles'};
        const role = 7;
        const post = {data: 'persistence', name: 'Testers'}

        const obj = fc(post, Entity, role);

        expect(obj).to.have.property('owner').to.have.property('name');
        expect(obj).to.have.property('roles').to.deep.equal([{role: 7, refs: 'users', name: 'Testers'}]);

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
        const Entity = {access: "myRoler", name: "roler"};
        const {accessSingleRoleRefs} = require('core/applications/transforms/hateoasTransform')(Entity);

        const collections = {
            name: "Tester name obj",
            myRoler: [
                {'role': 1, 'name': "Namer", 'refs': "users"}
            ]
        };


        const obj = accessSingleRoleRefs(collections, 123);

        expect(obj).to.have.property('items').with.lengthOf(collections[Entity.access].length);
        expect(obj).to.have.nested.property('items', collections[Entity.access]);
        done();
    });

    it('applications - transform - hateoasTransform - collectionTransform', function (done) {
        const Entity = {access: "myRoler", name: "roler"};
        const {collectionTransform} = require('core/applications/transforms/hateoasTransform')(Entity);

        const collections = [{
            name: "Tester name obj",
            myRoler: [
                {'role': 1, 'name': "Namer", 'refs': "users"},
                {'role': 7, 'name': "Namer2", 'refs': "teams"}
            ]
        }];


        const obj = collectionTransform(collections, collections.length, 20, 1);

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
        const Entity = {access: "myRoler", name: "roler"};
        const {singleTransform} = require('core/applications/transforms/hateoasTransform')(Entity);

        const collections = {
            name: "Tester name obj",
            myRoler: [
                {'role': 1, 'name': "Namer", 'refs': "users"}
            ]
        };


        const obj = singleTransform(collections, Entity);

        expect(obj).to.have.property('_links').to.be.a('object');
        expect(obj).to.have.property('name', collections.name);
        expect(obj).to.have.property('myRoler').with.lengthOf(collections.myRoler.length);
        done();
    });

    it('applications - transform - jsonParser', function (done) {
        const fc = require('core/applications/transforms/jsonParser');

        const query = '{"myjson": "data"}';
        const obj = fc({query}, 'query');

        expect(obj).to.have.property('query').to.have.property('myjson').to.equal('data');
        done();
    });

    it('applications - transform - jsonParser - invalid Json', function (done) {
        const fc = require('core/applications/transforms/jsonParser');

        const query = '{"myjson" "data"}';
        const obj = fc({query}, 'query');

        expect(obj).to.deep.equal({});
        done();
    });





    /*
    ========================== strId
     */

    it('applications - transform - mapRelationToObjectID - simple object', function (done) {
        const {ObjectId} = require('mongodb');
        const strIDtoObject = require('core/applications/transforms/mapRelationToObjectID');
        const str = "5a32943514ea552585daf6b1"

        const setup = {'tester': {'_id': str}};
        const key = ['tester'];
        const compare = {'tester': {'_id': ObjectId(str)}};

        expect(strIDtoObject(setup, key))
            .to.be.a('object')
            .to.have.property('tester')
            .to.be.a('object')
            .to.have.id(new ObjectId(str));

        expect(strIDtoObject(setup, key).tester._id instanceof ObjectId).to.be.true;
        done();
    });

    it('applications - transform - mapRelationToObjectID - array simple str', function (done) {
        const {ObjectId} = require('mongodb');
        const strIDtoObject = require('core/applications/transforms/mapRelationToObjectID');
        const str = "5a32943514ea552585daf6b1";
        const str2 = "5a2af615a6bbb1d69d4e83e7";

        const setup = {'tester': [str, str2]};
        const key = ['tester'];
        const compare = {'tester': [ObjectId(str), ObjectId(str2)]};

        expect(strIDtoObject(setup, key))
            .to.be.a('object')
            .to.have.property('tester')
            .to.same.ids([new ObjectId(str), new ObjectId(str2)]);

        expect(strIDtoObject(setup, key).tester[0] instanceof ObjectId).to.be.true;
        expect(strIDtoObject(setup, key).tester[1] instanceof ObjectId).to.be.true;
        done();
    });

    it('applications - transform - mapRelationToObjectID - array object', function (done) {
        const {ObjectId} = require('mongodb');
        const strIDtoObject = require('core/applications/transforms/mapRelationToObjectID');
        const str = "5a32943514ea552585daf6b1";
        const str2 = "5a2af615a6bbb1d69d4e83e7";

        const setup = {'tester': [{'_id': str}, {'_id': str2}]};
        const key = ['tester'];
        const compare = {'tester': [{'_id': ObjectId(str)}, {'_id': ObjectId(str2)}]};

        expect(strIDtoObject(setup, key))
            .to.be.a('object')
            .to.have.property('tester')
            .to.have.ids([new ObjectId(str), new ObjectId(str2)]);

        expect(strIDtoObject(setup, key).tester[0]._id instanceof ObjectId).to.be.true;
        expect(strIDtoObject(setup, key).tester[1]._id instanceof ObjectId).to.be.true;
        done();
    });

    it('applications - transform - transfID - object simple str', function (done) {
        const {ObjectId} = require('mongodb');
        const {transfID} = require('core/applications/transforms/mapRelationToObjectID');
        const str = "5a32943514ea552585daf6b1";

        const setup = {'tester': str};
        const key = 'tester';
        const compare = ObjectId(str);

        expect(transfID(setup, key))
            .to.be.a('object')
            .to.have.property('tester')
            .to.same.id(compare);

        expect(transfID(setup, key).tester instanceof ObjectId).to.be.true;
        done();
    });

    it('applications - transform - transfID - deeper object', function (done) {
        const {ObjectId} = require('mongodb');
        const {transfID} = require('core/applications/transforms/mapRelationToObjectID');
        const str = "5a32943514ea552585daf6b1";

        const setup = {'tester': {'another': {'deeper': str}}};
        const key = 'tester.another.deeper';
        const compare = ObjectId(str);

        expect(transfID(setup, key))
            .to.be.a('object')
            .to.have.property('tester')
            .to.have.property('another')
            .to.have.property('deeper')
            .to.same.id(compare);

        expect(transfID(setup, key).tester.another.deeper instanceof ObjectId).to.be.true;
        done();
    });

    it('applications - transform - swapUser', function (done) {
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

        const outherUser = {
            _id: "452ed4a4f4421335e032bfde",
            name: "Second"
        };

        const newParams = {idu: "452ed4a4f4421335e032b789", ida: "452ed4a4f4421335e032b123"}
        const Entity = {access: "myRoler", name: "users"};
        const fc = require('core/applications/transforms/swapUser');

        const obj = fc(req, outherUser, newParams, Entity);

        expect(obj).to.have.property('params').to.deep.equal({id: newParams['idu'], idu: newParams['ida']});
        expect(obj).to.have.property('user').to.deep.equal(Object.assign(outherUser, {refs: Entity.name}));
        done();
    });


    /*
    ========================== end strId
     */


    it('applications - validator - validAccessEmpty - error', function (done) {
        const fc = require('core/applications/validator/validAccessEmpty');

        expect(function(){
            fc({})
        }).to.throw('error');
        done();
    });

    it('applications - validator - validAccessEmpty', function (done) {
        const fc = require('core/applications/validator/validAccessEmpty');

        expect(function(){
            fc({name: "Something"})
        }).to.have.property("name");
        done();
    });

    it('applications - validator - validNotExist', function (done) {
        const fc = require('core/applications/validator/validNotExist');

        expect(function(){
            fc({name: "Something"})
        }).to.have.property("name");
        done();
    });

    it('applications - validator - validNotExist - Not Found', function (done) {
        const fc = require('core/applications/validator/validNotExist');

        expect(function(){
            fc({})
        }).to.throw('error');
        done();
    });

    it('applications - validator - validNotFound - error', function (done) {
        const validNotFound = require('core/applications/validator/validNotFound');

        expect(function(){
            validNotFound({}, 10, 10, 2)
        }).to.throw();
        done();
    });

    it('applications - validator - validNotFound', function (done) {
        const validNotFound = require('core/applications/validator/validNotFound');
        expect(validNotFound({name: "Something"}, 10, 30, 1)).to.have.property("name");
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


        it('updateSingle', function (done) {
            let updateSingleRoles = sinon.stub().resolves();
            let SPS = sinon.stub()
                .returns({
                    updateSingleRoles
                });

            AccessApp(Entity, SPS).updateSingle(req, res);

            sinon.assert.calledWithExactly(updateSingleRoles, req.params.id, req.params.idu, req.body, req.user);
            sinon.assert.calledOnce(updateSingleRoles);
            sinon.assert.calledOnce(SPS);
            done();
        });

        it('create', function (done) {
            let addRoles = sinon.stub().resolves();
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
            let deleteRoles = sinon.stub().resolves();
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
            let find = sinon.stub().resolves();
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
            let find = sinon.stub().resolves();
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
            let findOne = sinon.stub().resolves();
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

        it('update', function (done) {
            let update = sinon.stub().resolves();
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
            let create = sinon.stub().resolves();
            let SPS = sinon.stub()
                .returns({
                    create
                });
            PersistenceApp(Entity, SPS).create(req, res);

            let body = _.merge(
                req.body,
                {
                    owner: _.merge({
                        _id: "452ed4a4f4421335e032bf09",
                        name: "Signorini"
                    }, {refs: 'users'})
                },
                {[Entity.access]: [_.merge(req.user, {role: 7})]}
            );


            expect(create.getCalls()[0].args).to.deep.equal([body]);

            sinon.assert.calledOnce(create);
            sinon.assert.calledOnce(SPS);

            done();
        });

        it('create - filter', function (done) {
            let create = sinon.stub().resolves();
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

            sinon.assert.calledOnce(create);
            sinon.assert.calledOnce(SPS);

            expect(create.args[0]).to.not.deep.equal(body); // test filter args, can not have 'notHave' arg


            done();
        });

        it('create - witouh access entity', function (done) {
            const create = sinon.stub().resolves();
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

            expect(create.args[0][0]).to.deep.equal(req3.body);

            done();
        });

        it('remove', function (done) {
            let remove = sinon.stub().resolves();
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

    describe('applications - relationsApplication', function () {
        const Entity = {name: "Tester", access: "roler"};
        const REntity = {name: "Relation", access: "roler"};

        const AccessApp = require('core/applications/relationsApplication');

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


        it('find', function (done) {
            let find = sinon.stub().resolves();
            let SPS = sinon.stub()
                .returns({
                    find
                });

            AccessApp()(SPS)(REntity)(Entity).find(req, res);

            expect(find.getCalls()[0].args).to.length(3);
            sinon.assert.calledOnce(find);
            done();
        });

        it('count', function (done) {
            let count = sinon.stub().resolves();
            let SPS = sinon.stub()
                .returns({
                    count
                });

            AccessApp()(SPS)(REntity)(Entity).count(req, res);

            expect(count.getCalls()[0].args).to.length(3);
            sinon.assert.calledOnce(count);
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
            let signed = sinon.stub().resolves();
            let SPS = sinon.stub()
                .returns({
                    signed
                });

            AccessApp(Entity, SPS).uploader(req, res);

            sinon.assert.calledWithExactly(signed, req, req.user);
            sinon.assert.calledOnce(signed);
            sinon.assert.calledOnce(SPS);
            done();
        });

    });
});
