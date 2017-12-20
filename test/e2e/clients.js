'use strict';
require('dotenv').config({path: '.env.test'});

let chai = require('chai'),
    request = require('supertest'),
    cleaner_db = require('./libs/cleaner_db'),
    {expect} = chai,
    _ = require('lodash');


describe('e2e clients', function () {

    let app, mock;

    let user = {
        name: "MaestroUsers",
        email: "maestro@maestrousers.com",
        newemail: "mynew@mail.com",
        password: "mytester",
        token: null,
        _id: null
    };

    let clients = [{
        name: "Myclient",
        description: "My client description",
        contacts: [{channel: "HipChat", value: "TeamHipchat"}],
        tags: [{key: 'Tager', value: 'ValueTager'}],
    }, {
        name: "MySeconbdclient",
        email: "mysecondclient@client.com",
        description: "My second client description",
    }];

    let friend = {
        name: "Friend",
        email: "friend@maestrousers.com",
        password: "mytester",
        token: null,
        _id: null
    };

    before(function (done) {
      cleaner_db([{tb: 'users'}, {tb: 'clients'}, {tb: 'teams'}], () => {
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
     * Create client
     * @depends create user
     * @description I like to create a new client
     */
    describe('create client', function () {
        it('create client - create client', function (done) {
            request(mock)
                .post('/clients')
                .send(clients[0])
                .set('Authorization', `JWT ${user.token}`)
                .expect(201)
                .expect(/Myclient/)
                .expect(/contacts/)
                .expect(/HipChat/)
                .expect(/TeamHipchat/)
                .expect(/tags/)
                .expect(/Tager/)
                .expect(/ValueTager/)
                .expect(/_id/)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('create client - create client without token', function (done) {
            request(mock)
                .post('/clients')
                .send(clients[0])
                .expect(401)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('create client - create second client', function (done) {
            request(mock)
                .post('/clients')
                .send(clients[1])
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

        it('create client - validate fail', function (done) {
            request(mock)
                .post('/clients')
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
     * Get clients
     * @depends create client
     * @description I like to see my news clients
     */
    describe('read client', function () {
        it('list my client', function (done) {
            request(mock)
                .get('/clients')
                .set('Authorization', `JWT ${user.token}`)
                .expect(200)
                .expect('Content-Type', /json/)
                .expect(/Myclient/)
                .expect(/contacts/)
                .expect(/HipChat/)
                .expect(/TeamHipchat/)
                .expect(/tags/)
                .expect(/Tager/)
                .expect(/ValueTager/)
                .expect(/_id/)
                .expect(/_link/)
                .expect(/found/)
                .expect(function (res) {
                    expect(res.body.items).to.have.length(2);
                })
                .expect(function (res) {
                    Object.assign(clients[0], res.body.items[0]);
                    Object.assign(clients[1], res.body.items[1]);
                })
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('count my clients', function (done) {
            request(mock)
                .get('/clients/count')
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

        it('list my client without token', function (done) {
            request(mock)
                .get('/clients')
                .expect(401)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('list my client with filter', function (done) {
            request(mock)
                .get('/clients')
                .query({name: clients[0].name})
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
                .get('/clients')
                .query({limit: 1, page: 2})
                .expect(/Myclient/)
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

        it('Exist clients - test pagination list', function (done) {
            request(mock)
                .get('/clients')
                .query({limit: 1, page: 40})
                .set('Authorization', `JWT ${user.token}`)
                .expect(404)
                .expect(/not found/)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('see my new client', function (done) {
            request(mock)
                .get('/clients/' + clients[0]._id)
                .set('Authorization', `JWT ${user.token}`)
                .expect(200)
                .expect('Content-Type', /json/)
                .expect(/name/)
                .expect(/email/)
                .expect(/_link/)
                .expect(function (res) {
                    let roles = res.body['roles'].map(e=>_.omit(e, ['_links']))
                    Object.assign(clients[0], {roles});
                })
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });


        it('see my new client without token', function (done) {
            request(mock)
                .get('/clients/' + clients[0]._id)
                .expect(401)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('autocomplete', function (done) {
            request(mock)
                .get('/clients/')
                .query({query: "{'name': 'client'}"})
                .set('Authorization', `JWT ${user.token}`)
                .expect(200)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('autocomplete - not found', function (done) {
            request(mock)
                .get("/clients/")
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
                .get('/clients/autocomplete')
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
     * Patch client
     * @depends create client
     * @description I like to update my client witch name ChangeName, or add some services/auth/tags
     */
    describe('patch client', function () {
        it('patch client, changing name', function (done) {
            const data = Object.assign(clients[0], {name: "ChangeName"});

            request(mock)
                .patch('/clients/' + clients[0]._id)
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

        it('patch client add one contact', function (done) {
            let data = Object.assign({}, clients[0]);
            data['contacts'].push({channel: 'email', value: "valuee"});

            request(mock)
                .patch('/clients/' + clients[0]._id)
                .send(data)
                .set('Authorization', `JWT ${user.token}`)
                .expect(202)
                .expect('Content-Type', /json/)
                .expect(/contacts/)
                .expect(/email/)
                .expect(function (res) {
                    expect(res.body['contacts']).to.have.length(2);
                })
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('patch client add new invalidate contact (outherTag key)', function (done) {
            let data = _.cloneDeep(clients[0]);
            data['contacts'].push({outherKey: 'email', value: "valuee"});

            request(mock)
                .patch('/clients/' + clients[0]._id)
                .send(data)
                .set('Authorization', `JWT ${user.token}`)
                .expect(422)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('patch client add new tag (newTag, myvalue)', function (done) {
            let data = Object.assign({}, clients[0]);
            data['tags'].push({key: 'newTag', value: 'myValue'});

            request(mock)
                .patch('/clients/' + clients[0]._id)
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

        it('patch client add new invalidate tag (outherTag key)', function (done) {
            let dtd = _.cloneDeep(clients[0]);
            dtd['tags'].push({outherKey: 'newTag', value: 'myValue'});

            request(mock)
                .patch('/clients/' + clients[0]._id)
                .send(dtd)
                .set('Authorization', `JWT ${user.token}`)
                .expect(422)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('invalid data to patch client (empty test data)', function (done) {

            request(mock)
                .patch('/clients/' + clients[0]._id)
                .send({})
                .set('Authorization', `JWT ${user.token}`)
                .expect(422)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('try to patch client without token, and verify the error', function (done) {
            const data = Object.assign(clients[0], {name: "ChangeName"});

            request(mock)
                .patch('/clients/' + clients[0]._id)
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
     * Put client
     * @depends create client
     * @description I like to update my client witch name ChangeName, or change my cpu
     */
    describe('update client', function () {
        it('put client with valid data', function (done) {
            const data = Object.assign({}, clients[0], {name: "ChangeNameWithPut"});

            request(mock)
                .put('/clients/' + clients[0]._id)
                .send(data)
                .set('Authorization', `JWT ${user.token}`)
                .expect(e=>console.log(e.text))
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
     * Check updates/patchs client
     * @depends create client
     * @description I like ensure some effects
     */
    describe('confirm update client', function () {

        it('confirm my changes', function (done) {
            request(mock)
                .get('/clients/' + clients[0]._id)
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

        it('confirm if any of my updates/patchs dont create new client', function (done) {
            request(mock)
                .get('/clients')
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
     * @description I like to add new role into my Myclients
     */
    describe('e2e teams: add roles', function () {
        it('valid data to add roles', function (done) {
            const data = {role: "3", id: friend._id, refs: "users", name: friend.name, email: friend.email};

            request(mock)
                .post('/clients/' + clients[0]._id + '/roles')
                .send(data)
                .set('Authorization', `JWT ${user.token}`)
                .expect(e => console.log(e.text))
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
                .post('/clients/' + clients[0]._id + '/roles')
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
                .post('/clients/' + clients[0]._id + '/roles')
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
                .post('/clients/' + clients[0]._id + '/roles')
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
                .get('/clients/' + clients[0]._id)
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
     * @description I like to update the role clients role
     */
    describe('update roles', function () {
        it('Exist roles - update role client', function (done) {
            request(mock)
                .put('/clients/' + clients[0]._id + "/roles")
                .send(clients[0].roles)
                .set('Authorization', `JWT ${user.token}`)
                .expect(201)
                .expect('Content-Type', /json/)
                .expect(/users/)
                .expect(function (res) {
                    clients[0]['roles'] = res.body.items
                    expect(res.body.items).to.have.length(2);
                })
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('update role client without token', function (done) {
            request(mock)
                .put('/clients/' + clients[0]._id + "/roles")
                .send(clients[0].roles)
                .expect(401)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });
    });

    describe('update roles add new role and update all of them', function () {
        it('Exist roles - update role client, add new role', function (done) {
            let roles = clients[0].roles
            roles.push({role: 3, refs: 'organization'});

            request(mock)
                .put('/clients/' + clients[0]._id + "/roles")
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
        it('Exist roles - update role client', function (done) {
            request(mock)
                .put('/clients/' + clients[0]._id + "/roles/" + friend._id)
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

        it('update single role client without token', function (done) {
            request(mock)
                .put('/clients/' + clients[0]._id + "/roles/" + friend._id)
                .send({role: "1", refs: "users", name: friend.name, email: friend.email})
                .expect(401)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });
    });

    describe('confirm update roles', function () {
        it('Exist roles - confirm my news clients', function (done) {
            request(mock)
                .get('/clients/' + clients[0]._id)
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
     * @depends create client
     * @description I have SecondApp, and ai like to delete on role
     */
    describe('delete roles', function () {
        it('Exist roles - delete role', function (done) {
            request(mock)
                .delete('/clients/' + clients[0]._id + "/roles/" + friend._id)
                .set('Authorization', `JWT ${user.token}`)
                .expect(204)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('Exist roles - delete role without token', function (done) {
            request(mock)
                .delete('/clients/' + clients[0]._id + "/roles/" + friend._id)
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
                .get('/clients/' + clients[0]._id)
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
    =========================================================== delete clients
     */

    /**
     *
     * Delete clients
     * @depends create 2
     * @description I have 2 clients, i like to delete Secondclient.
     */
    describe('delete client', function () {
        it('Exist roles - delete my client', function (done) {
            request(mock)
                .delete('/clients/' + clients[0]._id)
                .set('Authorization', `JWT ${user.token}`)
                .expect(204)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });
    });

    describe('confirm to delete client', function () {
        it('Exist roles - delete my client', function (done) {
            request(mock)
                .get('/clients/')
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
