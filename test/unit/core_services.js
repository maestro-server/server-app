'use strict';
require('app-module-path').addPath(`${__dirname}/../../app`); //make more realiable to call modules

require('dotenv').config({path: '.env.test'});

let chai = require('chai'),
    chaid = require('chaid'),
    {expect} = chai,
    sinon = require('sinon'),
    chaiAsPromised = require("chai-as-promised"),
    _ = require('lodash');

chai.use(chaiAsPromised);
chai.use(chaid);

describe('unit - core', function () {


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

    it('services - transforms - accessMergeTransform - owner map', function (done) {
        const transforms = require('core/services/transforms/accessMergeTransform');

        const owner = [{name: "Tester", "_id": "452ed4a4f4421335e032bf09"}];
        const fielder = 'roler';
        const access = 3;

        const tt = transforms(owner, fielder, {}, access);

        expect(tt).to.have.property('$or')
            .to.be.a('array').with.lengthOf(1);

        done();
    });

    it('services - transforms - accessMergeTransform - makeAccess - not id', function (done) {
        const transforms = require('core/services/transforms/accessMergeTransform');

        const owner = {name: "Tester"};
        const fielder = 'roler';
        const access = 3;

        const tt = transforms.makeAccess(owner, fielder, access);
        expect(tt).to.be.a('boolean');

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
        const tt = valid("roler", "asd");

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
            let find = sinon.stub().resolves();
            let count = sinon.stub().resolves();
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
            let findOne = sinon.stub().resolves();
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

        it('findOne', function (done) {
            let findOne = sinon.stub().resolves();
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

        it('patch', function (done) {
            let patch = sinon.stub().resolves();
            let SPS = sinon.stub()
                .returns({
                    patch
                });

            const post = {name: "teste", owner: {name: "notAlloow"}, password: "notAllow"};
            PersistenceServices(Entity, SPS).patch(_id, post, owner);

            expect(patch.args[0][2][0]).to.not.have.property("password");
            expect(patch.args[0][2]).to.not.have.property("_id");
            expect(patch.args[0][2]).to.have.all.deep.members(["name"]);

            expect(patch.args[0][1]).to.have.property("name");
            expect(patch.args[0][1]).to.have.property("owner");
            expect(patch.args[0][1]).to.have.property("password");

            expect(patch.args[0][0]).to.have.property("_id");
            expect(patch.args[0][0]).to.have.property("roler");

            sinon.assert.calledOnce(patch);
            sinon.assert.calledOnce(SPS);
            done();
        });

        it('remove', function (done) {
            let remove = sinon.stub().resolves();
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


    describe('services - AccessServices', function () {
        const Entity = {name: "Tester", access: "roler", filled: ['name']};
        const AccessServices = require('core/services/AccessServices');

        const owner = {name: "tester", _id: "452ed4a4f4421335e032bf09"};
        const _id = "452ed4a4f4421335e032bf09";

        it('addRoles', function (done) {
            let updateByPushUnique = sinon.stub().resolves();
            let SPS = sinon.stub()
                .returns({
                    updateByPushUnique
                });

            const post = {role: "1", id: "452ed4a4f4421335e032bf09", name: "Tname", refs: "teams"};

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


        it('deleteRoles', function (done) {
            let updateByPull = sinon.stub().resolves();
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
            let sender = sinon.stub().resolves();
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
