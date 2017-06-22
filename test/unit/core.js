'use strict';
require('app-module-path').addPath(`${__dirname}/../../app`); //make more realiable to call modules

require('dotenv').config({path: '.env.test'});

let chai = require('chai'),
    {expect} = chai,
    sinon = require('sinon');

const chaiDeepMatch = require('chai-deep-match');
chai.use( chaiDeepMatch );

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
        const fac = require('core/applications/transforms/helpers/factoryObjHateoas');

        const obj = fac('tester', 'localhost', 'POST');

        expect(obj).to.have.property('tester').to.have.property('href');
        expect(obj).to.have.property('tester').to.have.property('method', 'POST');

        done();
    });

    it('applications - transform - formatFirstRole', function (done) {
        const me = require('core/applications/transforms/formatFirstRole');
        done();
    });

    it('applications - transform - hateoasTransform', function (done) {
        const me = require('core/applications/transforms/hateoasTransform');
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
