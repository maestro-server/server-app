'use strict';

let kraken = require('kraken-js'),
    chai = require('chai'),
    path = require('path'),
    request = require('supertest'),
    cleaner_db = require('./libs/cleaner_db'),
    {expect} = chai;


describe('e2e architectures', function () {

    let app, mock;

    let user = {
        name: "MaestroUsers",
        email: "maestro@maestrousers.com",
        newemail: "mynew@mail.com",
        password: "mytester",
        token: null,
        _id: null
    };

    let friend = {
        name: "Friend",
        email: "friend@maestrousers.com",
        password: "mytester",
        token: null,
        _id: null
    };

    let architectures = [{
        name: "Myarchitecture"
    }, {
        name: "Secondarchitecture"
    }];


    before(function (done) {
        require('dotenv').config({path: '.env.test'});
        app = require('../../app/app');

        app.use(kraken({
            basedir: path.resolve(__dirname, '../../app/')
        }));

        app.once('start', done);
        mock = app.listen(1337);
    });


    after(function (done) {
        cleaner_db(done, mock);
    });


    describe('create new user', function () {
        it('Create account - success', function (done) {
            request(mock)
                .post('/users')
                .send(user)
                .expect(201)
                .expect('Content-Type', /json/)
                .expect(/\"name\":\"MaestroUsers\"/)
                .expect(/maestro@maestrousers\.com/)
                .expect(/_id/)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
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

    describe('get token', function () {
        it('Exist user - get my token', function (done) {
            request(mock)
                .post('/users/auth')
                .send(user)
                .expect(200)
                .expect('Content-Type', /json/)
                .expect(/\"name\":\"MaestroUsers\"/)
                .expect(/maestro@maestrousers\.com/)
                .expect(/_id/)
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
    * Create architecture
    * @depends create user
    * @description I like to create a new architecture
    */
    describe('create architecture', function () {
        it('Create architecture - create architecture', function (done) {
            request(mock)
                .post('/architectures')
                .send(architectures[0])
                .set('Authorization', `JWT ${user.token}`)
                .expect(201)
                .expect('Content-Type', /json/)
                .expect(/Myarchitecture/)
                .expect(/_id/)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('Create architecture - create architecture without token', function (done) {
            request(mock)
                .post('/architectures')
                .send(architectures[0])
                .expect(401)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('Create architecture - create second architecture', function (done) {
            request(mock)
                .post('/architectures')
                .send(architectures[1])
                .set('Authorization', `JWT ${user.token}`)
                .expect(201)
                .expect('Content-Type', /json/)
                .expect(/name/)
                .expect(/_id/)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('Create architecture - validate fail', function (done) {
            request(mock)
                .post('/architectures')
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
    * Get architectures
    * @depends create architecture
    * @description I like to see my news architectures
    */
    describe('read architecture', function () {
        it('Exist architecture - list my architecture', function (done) {
            request(mock)
                .get('/architectures')
                .set('Authorization', `JWT ${user.token}`)
                .expect(200)
                .expect('Content-Type', /json/)
                .expect(/\"name\":\"Myarchitecture\"/)
                .expect(/_id/)
                .expect(function(res) {
                    expect(res.body.items).to.have.length(2);
                })
                .expect(function(res) {
                    Object.assign(architectures[0], res.body.items[0]);
                    Object.assign(architectures[1], res.body.items[1]);
                })
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('Exist architecture - list my architecture without token', function (done) {
            request(mock)
                .get('/architectures')
                .expect(401)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('Exist architecture - list my architecture with filter', function (done) {
            request(mock)
                .get('/architectures')
                .query({name: architectures[0].name})
                .set('Authorization', `JWT ${user.token}`)
                .expect(200)
                .expect('Content-Type', /json/)
                .expect(/name/)
                .expect(/_id/)
                .expect(function(res) {
                    expect(res.body.items).to.have.length(1);
                })
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('Exist architecture - test pagination list', function (done) {
            request(mock)
                .get('/architectures')
                .query({limit:1, page: 2})
                .expect(/Myarchitecture/)
                .set('Authorization', `JWT ${user.token}`)
                .expect(200)
                .expect(function(res) {
                    expect(res.body.items).to.have.length(1);
                })
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('Exist architecture - see my new architecture', function (done) {
            request(mock)
                .get('/architectures/'+architectures[0]._id)
                .set('Authorization', `JWT ${user.token}`)
                .expect(200)
                .expect('Content-Type', /json/)
                .expect(/name/)
                .expect(/email/)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('Exist architecture - see my new architecture without token', function (done) {
            request(mock)
                .get('/architectures/'+architectures[0]._id)
                .expect(401)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });


        it('Exist architecture -  autocomplete without token', function (done) {
            request(mock)
                .get('/architectures/autocomplete')
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
    * Update architecture
    * @depends create architecture
    * @description I like to update my architecture witch name ChangeName
    */
    describe('update architecture', function () {
        it('Exist architecture - update architecture with valid data', function (done) {
            const data = Object.assign(architectures[0], {name: "ChangeName"});

            request(mock)
                .patch('/architectures/'+architectures[0]._id)
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

        it('Exist architecture - invalid data to update architecture', function (done) {

            request(mock)
                .patch('/architectures/'+architectures[0]._id)
                .send({})
                .set('Authorization', `JWT ${user.token}`)
                .expect(422)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('Exist architecture - try to update architecture withou token', function (done) {
            const data = Object.assign(architectures[0], {name: "ChangeName"});

            request(mock)
                .patch('/architectures/'+architectures[0]._id)
                .send(data)
                .expect(401)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });
    });

    describe('confirm update architecture', function () {

        it('Exist architecture - confirm my changes', function (done) {
            request(mock)
                .get('/architectures/'+architectures[0]._id)
                .set('Authorization', `JWT ${user.token}`)
                .expect(200)
                .expect('Content-Type', /json/)
                .expect(/ChangeName/)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('Exist architecture - confirm if my update dont create new architecture', function (done) {
            request(mock)
                .get('/architectures')
                .set('Authorization', `JWT ${user.token}`)
                .expect(200)
                .expect('Content-Type', /json/)
                .expect(function(res) {
                    expect(res.body.items).to.have.length(2);
                })
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });
    });




    /**
    *
    * Create roles
    * @depends create team roles
    * @description I like to add new role into my Myarchitectures
    */
    describe('e2e teams: add roles', function () {
        it('Exist members - valid data to add roles', function (done) {
            const data = {role: "3", id: friend._id, refs: "users", name: friend.name, email: friend.email};

            request(mock)
                .post('/architectures/'+architectures[0]._id+'/roles')
                .send(data)
                .set('Authorization', `JWT ${user.token}`)
                .expect(201)
                .expect('Content-Type', /json/)
                .expect(/\"_ref\":\"users\"/)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('Exist members - invalid data to add roles (miss role)', function (done) {
            request(mock)
                .post('/architectures/'+architectures[0]._id+'/roles')
                .send(friend)
                .set('Authorization', `JWT ${user.token}`)
                .expect(422)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('Exist members - add roles without token', function (done) {
            const data = {role: "3", id: friend._id, refs: "users"};

            request(mock)
                .post('/architectures/'+architectures[0]._id+'/roles')
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
    * Get roles
    * @depends create roles
    * @description I like to see my roles
    */
    describe('get roles', function () {
        it('Exist roles - confirm my news roles', function (done) {
            request(mock)
                .get('/architectures/'+architectures[0]._id)
                .set('Authorization', `JWT ${user.token}`)
                .expect(200)
                .expect('Content-Type', /json/)
                .expect(/Friend/)
                .expect(/\"role\"\:3/)
                .expect(function(res) {
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
    * @description I like to update the role architectures role
    */
    describe('update roles', function () {
        it('Exist roles - update role architecture', function (done) {
            request(mock)
                .put('/architectures/'+architectures[0]._id+"/roles/"+friend._id)
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

        it('Exist members - update role architecture without token', function (done) {
            request(mock)
                .put('/architectures/'+architectures[0]._id+"/roles/"+friend._id)
                .send({role: "1", refs: "users", name: friend.name, email: friend.email})
                .expect(401)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });
    });

    describe('confirm update roles', function () {
        it('Exist roles - confirm my news architectures', function (done) {
            request(mock)
                .get('/architectures/'+architectures[0]._id)
                .set('Authorization', `JWT ${user.token}`)
                .expect(200)
                .expect('Content-Type', /json/)
                .expect(/Friend/)
                .expect(/\"role\"\:1/)
                .expect(function(res) {
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
    * Delete roles
    * @depends create architecture
    * @description I have SecondApp, and ai like to delete on role
    */
    describe('delete roles', function () {
        it('Exist roles - delete role', function (done) {
            request(mock)
                .delete('/architectures/'+architectures[0]._id+"/roles/"+friend._id)
                .set('Authorization', `JWT ${user.token}`)
                .expect(204)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('Exist roles - delete role without token', function (done) {
            request(mock)
                .delete('/architectures/'+architectures[0]._id+"/roles/"+friend._id)
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
                .get('/architectures/'+architectures[0]._id)
                .set('Authorization', `JWT ${user.token}`)
                .expect(200)
                .expect('Content-Type', /json/)
                .expect(function(res) {
                    expect(res.body.roles).to.have.length(1);
                })
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });
    });


    /**
    *
    * Delete architectures
    * @depends create 2
    * @description I have 2 architectures, i like to delete Secondarchitecture.
    */
    describe('delete architecture', function () {
        it('Exist roles - delete my architecture', function (done) {
            request(mock)
                .delete('/architectures/'+architectures[0]._id)
                .set('Authorization', `JWT ${user.token}`)
                .expect(204)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });
    });

    describe('confirm to delete architecture', function () {
        it('Exist roles - delete my architecture', function (done) {
            request(mock)
                .get('/architectures/')
                .set('Authorization', `JWT ${user.token}`)
                .expect(200)
                .expect('Content-Type', /json/)
                .expect(function(res) {
                    expect(res.body.items).to.have.length(1);
                })
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });
    });

});