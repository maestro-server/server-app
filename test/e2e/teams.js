'use strict';
require('dotenv').config({path: '.env.test'});

let chai = require('chai'),
    request = require('supertest'),
    cleaner_db = require('./libs/cleaner_db'),
    {expect} = chai;


describe('e2e teams', function () {

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

    let teams = [{
        name: "MyTeam",
        email: "maestro@team.com"
    }, {
        name: "SecondTeam",
        email: "second@team.com",
        url: "http://maestroserver.io"
    }];

    before(function (done) {
      cleaner_db([{tb: 'users'}, {tb: 'teams'}], () => {
        app = require('./libs/bootApp')();

        app.once('start', done);
        mock = app.listen(1346);
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
                .expect('Content-Type', /json/)
                .expect(/\"name\":\"MaestroUsers\"/)
                .expect(/maestro@maestrousers\.com/)
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
    * Create teams
    * @depends get token and create new user
    * @description I like to create a new team
    */
    describe('create team', function () {
        it('Create team - create team', function (done) {
            request(mock)
                .post('/teams')
                .send(teams[0])
                .set('Authorization', `JWT ${user.token}`)
                .expect(201)
                .expect('Content-Type', /json/)
                .expect(/MyTeam/)
                .expect(/maestro@team\.com/)
                .expect(/_id/)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('Create team - create team without token', function (done) {
            request(mock)
                .post('/teams')
                .send(teams[0])
                .expect(401)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('Create team - create second team', function (done) {
            request(mock)
                .post('/teams')
                .send(teams[1])
                .set('Authorization', `JWT ${user.token}`)
                .expect(201)
                .expect('Content-Type', /json/)
                .expect(/name/)
                .expect(/url/)
                .expect(/_id/)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('Create team - validate fail', function (done) {
            request(mock)
                .post('/teams')
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
    * Get teams
    * @depends create team
    * @description I like to see my news teams
    */
    describe('read team', function () {
        it('Exist team - list my team', function (done) {
            request(mock)
                .get('/teams')
                .set('Authorization', `JWT ${user.token}`)
                .expect(200)
                .expect('Content-Type', /json/)
                .expect(/\"name\":\"MyTeam\"/)
                .expect(/maestro@team\.com/)
                .expect(/_id/)
                .expect(function(res) {
                    expect(res.body.items).to.have.length(2);
                })
                .expect(function(res) {
                    Object.assign(teams[0], res.body.items[0]);
                    Object.assign(teams[1], res.body.items[1]);
                })
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('Exist team - list my team without token', function (done) {
            request(mock)
                .get('/teams')
                .expect(401)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('Exist team - list my team with filter', function (done) {
            request(mock)
                .get('/teams')
                .query({name: teams[0].name})
                .set('Authorization', `JWT ${user.token}`)
                .expect(200)
                .expect('Content-Type', /json/)
                .expect(/name/)
                .expect(/url/)
                .expect(/_id/)
                .expect(function(res) {
                    expect(res.body.items).to.have.length(1);
                })
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('Exist team - test pagination list', function (done) {
            request(mock)
                .get('/teams')
                .query({limit:1, page: 2})
                .expect(/MyTeam/)
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

        it('Exist team - see my new team', function (done) {
            request(mock)
                .get('/teams/'+teams[0]._id)
                .set('Authorization', `JWT ${user.token}`)
                .expect(200)
                .expect('Content-Type', /json/)
                .expect(/name/)
                .expect(/email/)
                .expect(/url/)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('Exist team - see my new team without token', function (done) {
            request(mock)
                .get('/teams/'+teams[0]._id)
                .expect(401)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('Exist team -  autocomplete', function (done) {
            request(mock)
                .get('/teams/autocomplete')
                .query({complete: "second"})
                .set('Authorization', `JWT ${user.token}`)
                .expect(200)
                .expect('Content-Type', /json/)
                .expect(/name"/)
                .expect(/url/)
                .expect(/_id/)
                .expect(function(res) {
                    expect(res.body.items).to.have.length(1);
                })
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('Exist team -  autocomplete without token', function (done) {
            request(mock)
                .get('/teams/autocomplete')
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
    * Update team
    * @depends create team
    * @description I like to update my team witch name ChangeName
    */
    describe('update team', function () {
        it('Exist team - update team with valid data', function (done) {
            const data = Object.assign(teams[0], {name: "ChangeName", email: "changeemail@email.com", url: "http://changeurl.com.br"});

            request(mock)
                .patch('/teams/'+teams[0]._id)
                .send(data)
                .set('Authorization', `JWT ${user.token}`)
                .expect(202)
                .expect('Content-Type', /json/)
                .expect(/\"name\":\"ChangeName\"/)
                .expect(/changeemail@email\.com/)
                .expect(/http:\/\/changeurl\.com\.br/)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('Exist team - invalid data to update team', function (done) {
            const data = Object.assign(teams[0], {name: "ChangeName", email: "changeemailmail.com", url: "changeurl.com.br"});

            request(mock)
                .patch('/teams/'+teams[0]._id)
                .send(data)
                .set('Authorization', `JWT ${user.token}`)
                .expect(422)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('Exist team - try to update team withou token', function (done) {
            const data = Object.assign(teams[0], {name: "ChangeName", email: "changeemail@email.com", url: "http://changeurl.com.br"});

            request(mock)
                .patch('/teams/'+teams[0]._id)
                .send(data)
                .expect(401)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });
    });

    describe('ensure update team', function () {

        it('Exist team - ensure my changes', function (done) {
            request(mock)
                .get('/teams/'+teams[0]._id)
                .set('Authorization', `JWT ${user.token}`)
                .expect(200)
                .expect('Content-Type', /json/)
                .expect(/ChangeName/)
                .expect(/changeemail@email\.com/)
                .expect(/http:\/\/changeurl\.com\.br/)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('Exist team - ensure if my update don`t create new team', function (done) {
            request(mock)
                .get('/teams')
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
    * Create members
    * @depends create team members
    * @description I like to add new members on my SecondTeam
    */
    describe('add members', function () {
        it('valid data to add members', function (done) {
            const data = {role: "3", id: friend._id, refs: "users", name: friend.name, email: friend.email};

            request(mock)
                .post('/teams/'+teams[0]._id+'/members')
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

        it('invalid data to add members (miss role)', function (done) {
            request(mock)
                .post('/teams/'+teams[0]._id+'/members')
                .send(friend)
                .set('Authorization', `JWT ${user.token}`)
                .expect(422)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('add members withou token', function (done) {
            const data = {role: "3", id: friend._id, refs: "users"};

            request(mock)
                .post('/teams/'+teams[0]._id+'/members')
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
    * Get members
    * @depends create members
    * @description I like to see my members
    */
    describe('get members', function () {
        it('ensure my news members', function (done) {
            request(mock)
                .get('/teams/'+teams[0]._id)
                .set('Authorization', `JWT ${user.token}`)
                .expect(200)
                .expect('Content-Type', /json/)
                .expect(/Friend/)
                .expect(/\"role\"\:3/)
                .expect(function(res) {
                    expect(res.body.members)  .to.have.length(2);
                })
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });
    });

    /**
    *
    * Update members
    * @depends create member
    * @description I like to update the role team member
    */
    describe('update members', function () {
        it('update role member', function (done) {
            request(mock)
                .put('/teams/'+teams[0]._id+"/members/"+friend._id)
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

        it('update role member without token', function (done) {
            request(mock)
                .put('/teams/'+teams[0]._id+"/members/"+friend._id)
                .send({role: "1", refs: "users", name: friend.name, email: friend.email})
                .expect(401)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });
    });

    describe('ensure update members', function () {
        it('ensure my news members', function (done) {
            request(mock)
                .get('/teams/'+teams[0]._id)
                .set('Authorization', `JWT ${user.token}`)
                .expect(200)
                .expect('Content-Type', /json/)
                .expect(/Friend/)
                .expect(/\"role\"\:1/)
                .expect(function(res) {
                    expect(res.body.members)  .to.have.length(2);
                })
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });
    });


    /**
    *
    * Delete members
    * @depends create team
    * @description I have SecondTeam, and ai like to delete on member
    */
    describe('delete members', function () {
        it('delete member', function (done) {
            request(mock)
                .delete('/teams/'+teams[0]._id+"/members/"+friend._id)
                .set('Authorization', `JWT ${user.token}`)
                .expect(204)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('delete member without token', function (done) {
            request(mock)
                .delete('/teams/'+teams[0]._id+"/members/"+friend._id)
                .expect(401)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });
    });

    describe('ensure delete members', function () {
        it('ensure my news members', function (done) {
            request(mock)
                .get('/teams/'+teams[0]._id)
                .set('Authorization', `JWT ${user.token}`)
                .expect(200)
                .expect('Content-Type', /json/)
                .expect(function(res) {
                    expect(res.body.members)  .to.have.length(1);
                })
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });
    });


    /**
    *
    * Delete teams
    * @depends create 2
    * @description I have 2 teams, i like to delete SecondTeam.
    */
    describe('delete team', function () {
        it('delete my team', function (done) {
            request(mock)
                .delete('/teams/'+teams[0]._id)
                .set('Authorization', `JWT ${user.token}`)
                .expect(204)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });
    });

    describe('ensure to delete team', function () {
        it('delete my team', function (done) {
            request(mock)
                .get('/teams/')
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
