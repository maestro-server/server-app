'use strict';
require('dotenv').config({path: '.env.test'});

let chai = require('chai'),
    request = require('supertest'),
    cleaner_db = require('./libs/cleaner_db'),
    {expect} = chai,
    _ = require('lodash');


describe('e2e flavors', function () {

    let app, mock;

    let user = {
        name: "MaestroUsers",
        email: "maestro@maestrousers.com",
        newemail: "mynew@mail.com",
        password: "mytester",
        token: null,
        _id: null
    };

    let flavors = [{
        name: "Myflavor",
        api_name: "My flavor description",
        provider: "AWS",
        datacenters: {
            name: "AWS - Base",
            _id: "5a3abbce66cc383cbc8e1282",
            zone: ["us-east-1a", "us-east-1b"]
        },
        tags: [{key: 'Tager', value: 'ValueTager'}]
    }, {
        name: "MySecondflavor",
        api_name: "My 2 flavor description",
        provider: "AWS",
        datacenters: {
            name: "AWS - Base",
            _id: "5a3abbce66cc383cbc8e1282",
            zone: ["us-east-1a", "us-east-1b"]
        },
    }];


    before(function (done) {
        cleaner_db([{tb: 'users'}, {tb: 'flavors'}], () => {
            app = require('./libs/bootApp')();

            app.once('start', done);
            mock = app.listen(1341);
        }, null);
    });

    after(function (done) {
        mock.close(done);
    });


    describe('create new user', function () {
        it('Create account - success', function (done) {
            request(mock)
                .post('/users')
                .send(user)
                .expect(201)
                .expect(/_id/)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

    });

    describe('get token', function () {
        it('Exist user - get my token', function (done) {
            request(mock)
                .post('/users/auth')
                .send(user)
                .expect(200)
                .expect((res) => {
                    user.token = res.body.token;
                    user._id = res.body.user._id;
                })
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });
    });

    /**
     *
     * Create flavor
     * @depends create user
     * @description I like to create a new flavor
     */
    describe('create flavor', function () {
        it('create flavor - create flavor', function (done) {
            request(mock)
                .post('/flavors')
                .send(flavors[0])
                .set('Authorization', `JWT ${user.token}`)
                .expect(201)
                .expect(/Myflavor/)
                .expect(/api_name/)
                .expect(/provider/)
                .expect(/_id/)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('create flavor - create flavor without token', function (done) {
            request(mock)
                .post('/flavors')
                .send(flavors[0])
                .expect(401)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('create flavor - create second flavor', function (done) {
            request(mock)
                .post('/flavors')
                .send(flavors[1])
                .set('Authorization', `JWT ${user.token}`)
                .expect(201)
                .expect('Content-Type', /json/)
                .expect(/name/)
                .expect(/_id/)
                .expect(res => !res.hasOwnProperty('thisFieldMustnApper'))
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('create flavor - validate fail', function (done) {
            request(mock)
                .post('/flavors')
                .set('Authorization', `JWT ${user.token}`)
                .expect(422)
                .expect('Content-Type', /json/)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });
    });


    /**
     *
     * Get flavors
     * @depends create flavor
     * @description I like to see my news flavors
     */
    describe('read flavor', function () {
        it('list my flavor', function (done) {
            request(mock)
                .get('/flavors')
                .set('Authorization', `JWT ${user.token}`)
                .expect(200)
                .expect('Content-Type', /json/)
                .expect(/Myflavor/)
                .expect(/api_name/)
                .expect(/provider/)
                .expect(/_id/)
                .expect(/_link/)
                .expect(/found/)
                .expect(function (res) {
                    expect(res.body.items).to.have.length(2);
                })
                .expect(function (res) {
                    Object.assign(flavors[0], res.body.items[0]);
                    Object.assign(flavors[1], res.body.items[1]);
                })
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('count my flavors', function (done) {
            request(mock)
                .get('/flavors/count')
                .set('Authorization', `JWT ${user.token}`)
                .expect(200)
                .expect(function (res) {
                    expect(res.body.count).to.equal(2);
                })
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('list my flavor without token', function (done) {
            request(mock)
                .get('/flavors')
                .expect(401)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('list my flavor with filter', function (done) {
            request(mock)
                .get('/flavors')
                .query({name: flavors[0].name})
                .set('Authorization', `JWT ${user.token}`)
                .expect(200)
                .expect('Content-Type', /json/)
                .expect(/name/)
                .expect(/_id/)
                .expect(function (res) {
                    expect(res.body.items).to.have.length(1);
                })
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('test pagination list', function (done) {
            request(mock)
                .get('/flavors')
                .query({limit: 1, page: 2})
                .expect(/Myflavor/)
                .set('Authorization', `JWT ${user.token}`)
                .expect(200)
                .expect(function (res) {
                    expect(res.body.items).to.have.length(1);
                })
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('Exist flavors - test pagination list', function (done) {
            request(mock)
                .get('/flavors')
                .query({limit: 1, page: 40})
                .set('Authorization', `JWT ${user.token}`)
                .expect(404)
                .expect(/not found/)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('see my new flavor', function (done) {
            request(mock)
                .get('/flavors/' + flavors[0]._id)
                .set('Authorization', `JWT ${user.token}`)
                .expect(200)
                .expect('Content-Type', /json/)
                .expect(/name/)
                .expect(/_link/)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });


        it('see my new flavor without token', function (done) {
            request(mock)
                .get('/flavors/' + flavors[0]._id)
                .expect(401)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('autocomplete', function (done) {
            request(mock)
                .get('/flavors/')
                .query({query: "{'name': 'flavor'}"})
                .set('Authorization', `JWT ${user.token}`)
                .expect(200)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('autocomplete - not found', function (done) {
            request(mock)
                .get("/flavors/")
                .query({query: '{"name": "notfuond"}'})
                .set('Authorization', `JWT ${user.token}`)
                .expect(e=> e.text.found == 0)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });


        it('autocomplete without token', function (done) {
            request(mock)
                .get('/flavors/autocomplete')
                .query({complete: "second"})
                .expect(401)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });
    });

    /**
     *
     * Patch flavor
     * @depends create flavor
     * @description I like to update my flavor witch name ChangeName, or add some services/auth/tags
     */
    describe('patch flavor', function () {
        it('patch flavor, changing name', function (done) {
            const data = Object.assign(flavors[0], {name: "ChangeName"});

            request(mock)
                .patch('/flavors/' + flavors[0]._id)
                .send(data)
                .set('Authorization', `JWT ${user.token}`)
                .expect(202)
                .expect('Content-Type', /json/)
                .expect(/\"name\":\"ChangeName\"/)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('patch flavor add new tag (newTag, myvalue)', function (done) {
            let data = Object.assign({}, flavors[0]);
            data['tags'].push({key: 'newTag', value: 'myValue'});

            request(mock)
                .patch('/flavors/' + flavors[0]._id)
                .send(data)
                .set('Authorization', `JWT ${user.token}`)
                .expect(202)
                .expect('Content-Type', /json/)
                .expect(/tags/)
                .expect(/newTag/)
                .expect(/myValue/)
                .expect(function (res) {
                    expect(res.body['tags']).to.have.length(2);
                })
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('patch flavor add new invalidate tag (outherTag key)', function (done) {
            let dtd = _.cloneDeep(flavors[0]);
            dtd['tags'].push({outherKey: 'newTag', value: 'myValue'});

            request(mock)
                .patch('/flavors/' + flavors[0]._id)
                .send(dtd)
                .set('Authorization', `JWT ${user.token}`)
                .expect(422)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('invalid data to patch flavor (empty test data)', function (done) {

            request(mock)
                .patch('/flavors/' + flavors[0]._id)
                .send({})
                .set('Authorization', `JWT ${user.token}`)
                .expect(422)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('try to patch flavor without token, and verify the error', function (done) {
            const data = Object.assign(flavors[0], {name: "ChangeName"});

            request(mock)
                .patch('/flavors/' + flavors[0]._id)
                .send(data)
                .expect(401)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });
    });

    /**
     *
     * Put flavor
     * @depends create flavor
     * @description I like to update my flavor witch name ChangeName, or change my cpu
     */
    describe('update flavor', function () {
        it('put flavor with valid data', function (done) {
            const data = Object.assign({}, flavors[0], {name: "ChangeNameWithPut"});

            request(mock)
                .put('/flavors/' + flavors[0]._id)
                .send(data)
                .set('Authorization', `JWT ${user.token}`)
                .expect(202)
                .expect('Content-Type', /json/)
                .expect(/\"name\":\"ChangeNameWithPut\"/)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });
    });

    /**
     *
     * Check updates/patchs flavor
     * @depends create flavor
     * @description I like ensure some effects
     */
    describe('ensure update flavor', function () {

        it('ensure my changes', function (done) {
            request(mock)
                .get('/flavors/' + flavors[0]._id)
                .set('Authorization', `JWT ${user.token}`)
                .expect(200)
                .expect('Content-Type', /json/)
                .expect(/ChangeNameWithPut/)
                .expect(/newTag/)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('ensure if any of my updates/patchs don`t create new flavor', function (done) {
            request(mock)
                .get('/flavors')
                .set('Authorization', `JWT ${user.token}`)
                .expect(200)
                .expect('Content-Type', /json/)
                .expect(function (res) {
                    expect(res.body.items).to.have.length(2);
                })
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });
    });






    /*
    =========================================================== delete flavors
     */

    /**
     *
     * Delete flavors
     * @depends create 2
     * @description I have 2 flavors, i like to delete Secondflavor.
     */
    describe('delete flavor', function () {
        it('Exist roles - delete my flavor', function (done) {
            request(mock)
                .delete('/flavors/' + flavors[0]._id)
                .set('Authorization', `JWT ${user.token}`)
                .expect(204)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });
    });

    describe('ensure to delete flavor', function () {
        it('Exist roles - delete my flavor', function (done) {
            request(mock)
                .get('/flavors/')
                .set('Authorization', `JWT ${user.token}`)
                .expect(200)
                .expect('Content-Type', /json/)
                .expect(function (res) {
                    expect(res.body.items).to.have.length(1);
                })
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });
    });



});
