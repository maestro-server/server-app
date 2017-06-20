'use strict';
require('dotenv').config({path: '.env.test'});

let chai = require('chai'),
    request = require('supertest'),
    cleaner_db = require('./libs/cleaner_db'),
    {expect} = chai;

describe('e2e applications', function () {
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

    let applications = [{
        name: "MyApplication"
    }, {
        name: "SecondApplication"
    }];

    const conn = process.env.MONGO_URL + '_app';
    before(function (done) {
        app = require('./libs/bootApp')(conn);

        app.once('start', done);
        mock = app.listen(1340);
    });

    after(function (done) {
        cleaner_db([{tb: 'users', ids: [user, friend]}, {tb: 'applications'}, {tb: 'teams'}], done, mock, conn);
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
     * Create application
     * @depends create user
     * @description I like to create a new application
     */
    describe('create application', function () {
        it('Create application - create application', function (done) {
            request(mock)
                .post('/applications')
                .send(applications[0])
                .set('Authorization', `JWT ${user.token}`)
                .expect(201)
                .expect('Content-Type', /json/)
                .expect(/MyApplication/)
                .expect(/_id/)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('Create application - create application without token', function (done) {
            request(mock)
                .post('/applications')
                .send(applications[0])
                .expect(401)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('Create application - create second application', function (done) {
            request(mock)
                .post('/applications')
                .send(applications[1])
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

        it('Create application - validate fail', function (done) {
            request(mock)
                .post('/applications')
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
     * Get applications
     * @depends create application
     * @description I like to see my news applications
     */
    describe('read application', function () {
        it('Exist application - list my application', function (done) {
            request(mock)
                .get('/applications')
                .set('Authorization', `JWT ${user.token}`)
                .expect(200)
                .expect('Content-Type', /json/)
                .expect(/\"name\":\"MyApplication\"/)
                .expect(/_id/)
                .expect(function (res) {
                    expect(res.body.items).to.have.length(2);
                })
                .expect(function (res) {
                    Object.assign(applications[0], res.body.items[0]);
                    Object.assign(applications[1], res.body.items[1]);
                })
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('Exist application - list my application without token', function (done) {
            request(mock)
                .get('/applications')
                .expect(401)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('Exist application - list my application with filter', function (done) {
            request(mock)
                .get('/applications')
                .query({name: applications[0].name})
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

        it('Exist application - test pagination list', function (done) {
            request(mock)
                .get('/applications')
                .query({limit: 1, page: 2})
                .expect(/MyApplication/)
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

        it('Exist application - see my new application', function (done) {
            request(mock)
                .get('/applications/' + applications[0]._id)
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

        it('Exist application - see my new application without token', function (done) {
            request(mock)
                .get('/applications/' + applications[0]._id)
                .expect(401)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });


        it('Exist application -  autocomplete without token', function (done) {
            request(mock)
                .get('/applications/autocomplete')
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
     * Update application
     * @depends create application
     * @description I like to update my application witch name ChangeName
     */
    describe('update application', function () {
        it('Exist application - update application with valid data', function (done) {
            const data = Object.assign(applications[0], {name: "ChangeName"});

            request(mock)
                .patch('/applications/' + applications[0]._id)
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

        it('Exist application - invalid data to update application', function (done) {

            request(mock)
                .patch('/applications/' + applications[0]._id)
                .send({})
                .set('Authorization', `JWT ${user.token}`)
                .expect(422)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('Exist application - try to update application withou token', function (done) {
            const data = Object.assign(applications[0], {name: "ChangeName"});

            request(mock)
                .patch('/applications/' + applications[0]._id)
                .send(data)
                .expect(401)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });
    });

    describe('confirm update application', function () {

        it('Exist application - confirm my changes', function (done) {
            request(mock)
                .get('/applications/' + applications[0]._id)
                .set('Authorization', `JWT ${user.token}`)
                .expect(200)
                .expect('Content-Type', /json/)
                .expect(/ChangeName/)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('Exist application - confirm if my update dont create new application', function (done) {
            request(mock)
                .get('/applications')
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


    /**
     *
     * Create roles
     * @depends create team roles
     * @description I like to add new role into my MyApplications
     */
    describe('e2e teams: add roles', function () {
        it('Exist members - valid data to add roles', function (done) {
            const data = {role: "3", id: friend._id, refs: "users", name: friend.name, email: friend.email};

            request(mock)
                .post('/applications/' + applications[0]._id + '/roles')
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

        it('Exist members - invalid data to add roles (miss role)', function (done) {
            request(mock)
                .post('/applications/' + applications[0]._id + '/roles')
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
                .post('/applications/' + applications[0]._id + '/roles')
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
                .get('/applications/' + applications[0]._id)
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
     * @description I like to update the role applications role
     */
    describe('update roles', function () {
        it('Exist roles - update role application', function (done) {
            request(mock)
                .put('/applications/' + applications[0]._id + "/roles/" + friend._id)
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

        it('Exist members - update role application without token', function (done) {
            request(mock)
                .put('/applications/' + applications[0]._id + "/roles/" + friend._id)
                .send({role: "1", refs: "users", name: friend.name, email: friend.email})
                .expect(401)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });
    });

    describe('confirm update roles', function () {
        it('Exist roles - confirm my news applications', function (done) {
            request(mock)
                .get('/applications/' + applications[0]._id)
                .set('Authorization', `JWT ${user.token}`)
                .expect(200)
                .expect('Content-Type', /json/)
                .expect(/Friend/)
                .expect(/\"role\"\:1/)
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
     * Delete roles
     * @depends create application
     * @description I have SecondApp, and ai like to delete on role
     */
    describe('delete roles', function () {
        it('Exist roles - delete role', function (done) {
            request(mock)
                .delete('/applications/' + applications[0]._id + "/roles/" + friend._id)
                .set('Authorization', `JWT ${user.token}`)
                .expect(204)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('Exist roles - delete role without token', function (done) {
            request(mock)
                .delete('/applications/' + applications[0]._id + "/roles/" + friend._id)
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
                .get('/applications/' + applications[0]._id)
                .set('Authorization', `JWT ${user.token}`)
                .expect(200)
                .expect('Content-Type', /json/)
                .expect(function (res) {
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
     * Delete applications
     * @depends create 2
     * @description I have 2 applications, i like to delete SecondApplication.
     */
    describe('delete application', function () {
        it('Exist roles - delete my application', function (done) {
            request(mock)
                .delete('/applications/' + applications[0]._id)
                .set('Authorization', `JWT ${user.token}`)
                .expect(204)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });
    });

    describe('confirm to delete application', function () {
        it('Exist roles - delete my application', function (done) {
            request(mock)
                .get('/applications/')
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


/*
------------------------------------------------------ team app --------
 */
    let teams = {
        name: "MyTeam"
    };

    let teamsAPP = [{
        name: "MyApplicationT"
    }, {
        name: "SecondApplicationT"
    }];


    describe('create team', function () {
        it('Create team', function (done) {
            request(mock)
                .post('/teams')
                .send(teams)
                .set('Authorization', `JWT ${user.token}`)
                .expect(201)
                .expect('Content-Type', /json/)
                .expect(/MyTeam/)
                .expect(/_id/)
                .expect((res) => {
                    teams._id = res.body._id;
                })
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });
    });

    describe('create team application', function () {
        it('Create team application - create team application', function (done) {
            request(mock)
                .post(`/teams/${teams._id}/applications`)
                .send(teamsAPP[0])
                .set('Authorization', `JWT ${user.token}`)
                .expect(201)
                .expect('Content-Type', /json/)
                .expect(/MyApplicationT/)
                .expect(/teams/)
                .expect(/_id/)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });


        it('Create team application - create second application', function (done) {
            request(mock)
                .post(`/teams/${teams._id}/applications`)
                .send(teamsAPP[1])
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

    });

    /**
     *
     * Get applications
     * @depends create application
     * @description I like to see my news applications
     */
    describe('read team application', function () {
        it('Exist application - list my application', function (done) {
            request(mock)
                .get(`/teams/${teams._id}/applications`)
                .set('Authorization', `JWT ${user.token}`)
                .expect(200)
                .expect('Content-Type', /json/)
                .expect(/\"name\":\"MyApplicationT\"/)
                .expect(/_id/)
                .expect(function (res) {
                    expect(res.body.items).to.have.length(2);
                })
                .expect(function (res) {
                    Object.assign(teamsAPP[0], res.body.items[0]);
                    Object.assign(teamsAPP[1], res.body.items[1]);
                })
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('Exist team application - list my application without token', function (done) {
            request(mock)
                .get(`/teams/${teams._id}/applications`)
                .expect(401)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('Exist team application - list my application with filter', function (done) {
            request(mock)
                .get(`/teams/${teams._id}/applications`)
                .query({name: teamsAPP[0].name})
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

        it('Exist team application - test pagination list', function (done) {
            request(mock)
                .get(`/teams/${teams._id}/applications`)
                .query({limit: 1, page: 2})
                .expect(/MyApplication/)
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

        it('Exist team application - see my new application', function (done) {
            request(mock)
                .get(`/teams/${teams._id}/applications/${teamsAPP[0]._id}`)
                .set('Authorization', `JWT ${user.token}`)
                .expect(200)
                .expect('Content-Type', /json/)
                .expect(/name/)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('Exist team application - see my new application without token', function (done) {
            request(mock)
                .get(`/teams/${teams._id}/applications/${teamsAPP[0]._id}`)
                .expect(401)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });
    });

    /**
     *
     * Update application
     * @depends create application
     * @description I like to update my application witch name ChangeName
     */
    describe('update team application', function () {
        it('Exist team application - update application with valid data', function (done) {
            const data = Object.assign(teamsAPP[0], {name: "ChangeName"});

            request(mock)
                .patch(`/teams/${teams._id}/applications/${teamsAPP[0]._id}`)
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

        it('Exist team application - invalid data to update application', function (done) {

            request(mock)
                .patch(`/teams/${teams._id}/applications/${teamsAPP[0]._id}`)
                .send({})
                .set('Authorization', `JWT ${user.token}`)
                .expect(422)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('Exist team application - try to update application withou token', function (done) {
            const data = Object.assign(teamsAPP[0], {name: "ChangeName"});

            request(mock)
                .patch(`/teams/${teams._id}/applications/${teamsAPP[0]._id}`)
                .send(data)
                .expect(401)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });
    });

    describe('confirm team update application', function () {

        it('Exist team application - confirm my changes', function (done) {
            request(mock)
                .get(`/teams/${teams._id}/applications/${teamsAPP[0]._id}`)
                .set('Authorization', `JWT ${user.token}`)
                .expect(200)
                .expect('Content-Type', /json/)
                .expect(/ChangeName/)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('Exist team application - confirm if my update dont create new application', function (done) {
            request(mock)
                .get(`/teams/${teams._id}/applications`)
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


    /**
     *
     * Create roles
     * @depends create team roles
     * @description I like to add new role into my MyApplications
     */
    describe('e2e add teams in team: add roles', function () {
        it('Exist members - valid data to add roles', function (done) {
            const data = {role: "3", id: friend._id, refs: "users", name: friend.name, email: friend.email};

            request(mock)
                .post(`/teams/${teams._id}/applications/${teamsAPP[0]._id}/roles`)
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

        it('Exist team members - invalid data to add roles (miss role)', function (done) {
            request(mock)
                .post(`/teams/${teams._id}/applications/${teamsAPP[0]._id}/roles`)
                .send(friend)
                .set('Authorization', `JWT ${user.token}`)
                .expect(422)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('Exist team members - add roles without token', function (done) {
            const data = {role: "3", id: friend._id, refs: "users"};

            request(mock)
                .post(`/teams/${teams._id}/applications/${teamsAPP[0]._id}/roles`)
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
    describe('get team roles', function () {
        it('Exist roles - confirm my news roles', function (done) {
            request(mock)
                .get(`/teams/${teams._id}/applications/${teamsAPP[0]._id}`)
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
     * @description I like to update the role applications role
     */
    describe('update teams roles', function () {
        it('Exist roles - update role application', function (done) {
            request(mock)
                .patch(`/teams/${teams._id}/applications/${teamsAPP[0]._id}/roles/${friend._id}`)
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

        it('Exist teams members - update role application without token', function (done) {
            request(mock)
                .patch(`/teams/${teams._id}/applications/${teamsAPP[0]._id}/roles/${friend._id}`)
                .send({role: "1", refs: "users", name: friend.name, email: friend.email})
                .expect(401)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });
    });

    describe('confirm team update roles', function () {
        it('Exist roles - confirm my news applications', function (done) {
            request(mock)
                .get(`/teams/${teams._id}/applications/${teamsAPP[0]._id}`)
                .set('Authorization', `JWT ${user.token}`)
                .expect(200)
                .expect(e=>console.log(e.body))
                .expect('Content-Type', /json/)
                .expect(/Friend/)
                .expect(/\"role\"\:1/)
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
     * Delete roles
     * @depends create application
     * @description I have SecondApp, and ai like to delete on role
     */
    describe('delete team roles', function () {
        it('Exist roles - delete role', function (done) {
            request(mock)
                .delete(`/teams/${teams._id}/applications/${teamsAPP[0]._id}/roles/${friend._id}`)
                .set('Authorization', `JWT ${user.token}`)
                .expect(204)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('Exist team roles - delete role without token', function (done) {
            request(mock)
                .delete(`/teams/${teams._id}/applications/${teamsAPP[0]._id}/roles/${friend._id}`)
                .expect(401)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });
    });

    describe('confirm team delete roles', function () {
        it('Exist roles - confirm my news role', function (done) {
            request(mock)
                .get(`/teams/${teams._id}/applications/${teamsAPP[0]._id}`)
                .set('Authorization', `JWT ${user.token}`)
                .expect(200)
                .expect('Content-Type', /json/)
                .expect(function (res) {
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
     * Delete applications
     * @depends create 2
     * @description I have 2 applications, i like to delete SecondApplication.
     */
    describe('delete team application', function () {
        it('Exist roles - delete my application', function (done) {
            request(mock)
                .delete(`/teams/${teams._id}/applications/${teamsAPP[0]._id}`)
                .set('Authorization', `JWT ${user.token}`)
                .expect(204)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });
    });

    describe('confirm team  delete application', function () {
        it('Exist roles - delete my application', function (done) {
            request(mock)
                .get(`/teams/${teams._id}/applications`)
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
