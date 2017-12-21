'use strict';
require('dotenv').config({path: '.env.test'});

let chai = require('chai'),
    request = require('supertest'),
    cleaner_db = require('./libs/cleaner_db'),
    {expect} = chai,
    _ = require('lodash');


describe('e2e datacenters', function () {

    let app, mock;

    let user = {
        name: "MaestroUsers",
        email: "maestro@maestrousers.com",
        newemail: "mynew@mail.com",
        password: "mytester",
        token: null,
        _id: null
    };

    let datacenters = [{
        name: "Mydatacenter",
        regions: ["us-virginia", "sp-virginia"],
        zones: ["us-virginia-1a", "sp-virginia-1b"],
        provider: "AWS"
    }, {
        name: "MySeconddatacenter",
        regions: ["glete", "tambore"],
        zones: ["br-sp-1a", "br-sp-1b"],
        provider: "OpenStack",
        thisFieldMustnApper: 'NotApper'
    }];

    let friend = {
        name: "Friend",
        email: "friend@maestrousers.com",
        password: "mytester",
        token: null,
        _id: null
    };

    before(function (done) {
      cleaner_db([{tb: 'users'}, {tb: 'datacenters'}], () => {
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

        it('Create account - success friend', function (done) {
            request(mock)
                .post('/users')
                .send(friend)
                .expect(201)
                .expect('Content-Type', /json/)
                .expect(/\"name\":\"Friend\"/)
                .expect(/_id/)
                .expect((res) => {
                    friend._id = res.body._id;
                })
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
     * Create datacenter
     * @depends create user
     * @description I like to create a new datacenter
     */
    describe('create datacenter', function () {
        it('create datacenter - create datacenter', function (done) {
            request(mock)
                .post('/datacenters')
                .send(datacenters[0])
                .set('Authorization', `JWT ${user.token}`)
                .expect(201)
                .expect('Content-Type', /json/)
                .expect(/Mydatacenter/)
                .expect(/zones/)
                .expect(/regions/)
                .expect(/us-virginia/)
                .expect(/sp-virginia/)
                .expect(/AWS/)
                .expect(/_id/)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('create datacenter - create datacenter without token', function (done) {
            request(mock)
                .post('/datacenters')
                .send(datacenters[0])
                .expect(401)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('create datacenter - create second datacenter', function (done) {
            request(mock)
                .post('/datacenters')
                .send(datacenters[1])
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

        it('create datacenter - validate fail', function (done) {
            request(mock)
                .post('/datacenters')
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
     * Get datacenters
     * @depends create datacenter
     * @description I like to see my news datacenters
     */
    describe('read datacenter', function () {
        it('list my datacenter', function (done) {
            request(mock)
                .get('/datacenters')
                .set('Authorization', `JWT ${user.token}`)
                .expect(200)
                .expect('Content-Type', /json/)
                .expect(/Mydatacenter/)
                .expect(/zones/)
                .expect(/regions/)
                .expect(/us-virginia/)
                .expect(/sp-virginia/)
                .expect(/AWS/)
                .expect(/_id/)
                .expect(/_link/)
                .expect(/found/)
                .expect(function (res) {
                    expect(res.body.items).to.have.length(2);
                })
                .expect(function (res) {
                    Object.assign(datacenters[0], res.body.items[0]);
                    Object.assign(datacenters[1], res.body.items[1]);
                })
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('count my datacenters', function (done) {
            request(mock)
                .get('/datacenters/count')
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

        it('list my datacenter without token', function (done) {
            request(mock)
                .get('/datacenters')
                .expect(401)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('list my datacenter with filter', function (done) {
            request(mock)
                .get('/datacenters')
                .query({name: datacenters[0].name})
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
                .get('/datacenters')
                .query({limit: 1, page: 2})
                .expect(/Mydatacenter/)
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

        it('Exist datacenters - test pagination list', function (done) {
            request(mock)
                .get('/datacenters')
                .query({limit: 1, page: 40})
                .set('Authorization', `JWT ${user.token}`)
                .expect(404)
                .expect(/not found/)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('see my new datacenter', function (done) {
            request(mock)
                .get('/datacenters/' + datacenters[0]._id)
                .set('Authorization', `JWT ${user.token}`)
                .expect(200)
                .expect('Content-Type', /json/)
                .expect(/name/)
                .expect(/email/)
                .expect(/_link/)
                .expect(function (res) {
                    let roles = res.body['roles'].map(e=>_.omit(e, ['_links']))
                    Object.assign(datacenters[0], {roles});
                })
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });


        it('see my new datacenter without token', function (done) {
            request(mock)
                .get('/datacenters/' + datacenters[0]._id)
                .expect(401)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('autocomplete', function (done) {
            request(mock)
                .get('/datacenters/')
                .query({query: "{'name': 'datacenter'}"})
                .set('Authorization', `JWT ${user.token}`)
                .expect(200)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('autocomplete - not found', function (done) {
            request(mock)
                .get("/datacenters/")
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
                .get('/datacenters/autocomplete')
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
     * Patch datacenter
     * @depends create datacenter
     * @description I like to update my datacenter witch name ChangeName, or add some services/auth/tags
     */
    describe('patch datacenter', function () {
        it('patch datacenter, changing name', function (done) {
            const data = Object.assign(datacenters[0], {name: "ChangeName"});

            request(mock)
                .patch('/datacenters/' + datacenters[0]._id)
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

        it('invalid data to patch datacenter (empty test data)', function (done) {

            request(mock)
                .patch('/datacenters/' + datacenters[0]._id)
                .send({})
                .set('Authorization', `JWT ${user.token}`)
                .expect(422)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('try to patch datacenter without token, and verify the error', function (done) {
            const data = Object.assign(datacenters[0], {name: "ChangeName"});

            request(mock)
                .patch('/datacenters/' + datacenters[0]._id)
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
     * Put datacenter
     * @depends create datacenter
     * @description I like to update my datacenter witch name ChangeName, or change my cpu
     */
    describe('update datacenter', function () {
        it('put datacenter with valid data', function (done) {
            const data = Object.assign(datacenters[0], {name: "ChangeNameWithPut"});

            request(mock)
                .put('/datacenters/' + datacenters[0]._id)
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
     * Check updates/patchs datacenter
     * @depends create datacenter
     * @description I like ensure some effects
     */
    describe('confirm update datacenter', function () {

        it('confirm my changes', function (done) {
            request(mock)
                .get('/datacenters/' + datacenters[0]._id)
                .set('Authorization', `JWT ${user.token}`)
                .expect(200)
                .expect('Content-Type', /json/)
                .expect(/ChangeNameWithPut/)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('confirm if any of my updates/patchs dont create new datacenter', function (done) {
            request(mock)
                .get('/datacenters')
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
    =============================================== roles ==================================================
     */

    /**
     *
     * Create roles
     * @depends create team roles
     * @description I like to add new role into my Mydatacenters
     */
    describe('e2e teams: add roles', function () {
        it('valid data to add roles', function (done) {
            const data = {role: "3", id: friend._id, refs: "users", name: friend.name, email: friend.email};

            request(mock)
                .post('/datacenters/' + datacenters[0]._id + '/roles')
                .send(data)
                .set('Authorization', `JWT ${user.token}`)
                .expect(201)
                .expect('Content-Type', /json/)
                .expect(/\"refs\":\"users\"/)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('invalid data to add roles (miss role)', function (done) {
            request(mock)
                .post('/datacenters/' + datacenters[0]._id + '/roles')
                .send(friend)
                .set('Authorization', `JWT ${user.token}`)
                .expect(422)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('add roles without token', function (done) {
            const data = {role: "3", id: friend._id, refs: "users"};

            request(mock)
                .post('/datacenters/' + datacenters[0]._id + '/roles')
                .send(data)
                .expect(401)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });
    });

    describe('e2e teams: add duplicate role roles', function () {
        it('dont insert double roles', function (done) {
            const data = {role: "3", id: friend._id, refs: "users", name: friend.name, email: friend.email};

            request(mock)
                .post('/datacenters/' + datacenters[0]._id + '/roles')
                .send(data)
                .set('Authorization', `JWT ${user.token}`)
                .expect(400)
                .expect('Content-Type', /json/)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });
    });

    /**
     *
     * Get roles
     * @depends create roles
     * @description I like to see my roles
     */
    describe('get roles', function () {
        it('Exist roles - confirm my news roles', function (done) {
            request(mock)
                .get('/datacenters/' + datacenters[0]._id)
                .set('Authorization', `JWT ${user.token}`)
                .expect(200)
                .expect('Content-Type', /json/)
                .expect(/Friend/)
                .expect(/\"role\"\:3/)
                .expect(function (res) {
                    expect(res.body.roles).to.have.length(2);
                })
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });
    });

    /**
     *
     * Update roles
     * @depends create role
     * @description I like to update the role datacenters role
     */
    describe('update roles', function () {
        it('Exist roles - update role datacenter', function (done) {
            request(mock)
                .put('/datacenters/' + datacenters[0]._id + "/roles")
                .send(datacenters[0].roles)
                .set('Authorization', `JWT ${user.token}`)
                .expect(201)
                .expect('Content-Type', /json/)
                .expect(/users/)
                .expect(function (res) {
                    datacenters[0]['roles'] = res.body.items
                    expect(res.body.items).to.have.length(2);
                })
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('update role datacenter without token', function (done) {
            request(mock)
                .put('/datacenters/' + datacenters[0]._id + "/roles")
                .send(datacenters[0].roles)
                .expect(401)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });
    });

    describe('update roles add new role and update all of them', function () {
        it('Exist roles - update role datacenter, add new role', function (done) {
            let roles = datacenters[0].roles
            roles.push({role: 3, refs: 'organization'});

            request(mock)
                .put('/datacenters/' + datacenters[0]._id + "/roles")
                .send(roles)
                .set('Authorization', `JWT ${user.token}`)
                .expect(201)
                .expect('Content-Type', /json/)
                .expect(/organization/)
                .expect(function (res) {
                    expect(res.body.items).to.have.length(3);
                })
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });
    });

    describe('update single roles', function () {
        it('Exist roles - update role datacenter', function (done) {
            request(mock)
                .put('/datacenters/' + datacenters[0]._id + "/roles/" + friend._id)
                .send({role: "1", refs: "users", name: friend.name, email: friend.email})
                .set('Authorization', `JWT ${user.token}`)
                .expect(201)
                .expect('Content-Type', /json/)
                .expect(/\"role\"\:1/)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('update single role datacenter without token', function (done) {
            request(mock)
                .put('/datacenters/' + datacenters[0]._id + "/roles/" + friend._id)
                .send({role: "1", refs: "users", name: friend.name, email: friend.email})
                .expect(401)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });
    });

    describe('confirm update roles', function () {
        it('Exist roles - confirm my news datacenters', function (done) {
            request(mock)
                .get('/datacenters/' + datacenters[0]._id)
                .set('Authorization', `JWT ${user.token}`)
                .expect(200)
                .expect('Content-Type', /json/)
                .expect(/Friend/)
                .expect(/\"role\"\:1/)
                .expect(function (res) {
                    expect(res.body.roles).to.have.length(3);
                })
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });
    });

    /**
     *
     * Delete roles
     * @depends create datacenter
     * @description I have SecondApp, and ai like to delete on role
     */
    describe('delete roles', function () {
        it('Exist roles - delete role', function (done) {
            request(mock)
                .delete('/datacenters/' + datacenters[0]._id + "/roles/" + friend._id)
                .set('Authorization', `JWT ${user.token}`)
                .expect(204)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('Exist roles - delete role without token', function (done) {
            request(mock)
                .delete('/datacenters/' + datacenters[0]._id + "/roles/" + friend._id)
                .expect(401)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });
    });

    describe('confirm delete roles', function () {
        it('Exist roles - confirm my news role', function (done) {
            request(mock)
                .get('/datacenters/' + datacenters[0]._id)
                .set('Authorization', `JWT ${user.token}`)
                .expect(200)
                .expect('Content-Type', /json/)
                .expect(function (res) {
                    expect(res.body.roles).to.have.length(2);
                })
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });
    });



    /*
    =========================================================== delete datacenters
     */

    /**
     *
     * Delete datacenters
     * @depends create 2
     * @description I have 2 datacenters, i like to delete Seconddatacenter.
     */
    describe('delete datacenter', function () {
        it('Exist roles - delete my datacenter', function (done) {
            request(mock)
                .delete('/datacenters/' + datacenters[0]._id)
                .set('Authorization', `JWT ${user.token}`)
                .expect(204)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });
    });

    describe('confirm to delete datacenter', function () {
        it('Exist roles - delete my datacenter', function (done) {
            request(mock)
                .get('/datacenters/')
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
