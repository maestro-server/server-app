'use strict';
require('dotenv').config({path: '.env.test'});

let request = require('supertest'),
    cleaner_db = require('./libs/cleaner_db');


describe('e2e check access roles', function () {

    let app, mock;

    let user = {
        name: "roles_MaestroUsers",
        email: "roles_maestro@maestrousers.com",
        newemail: "roles_roles_mynew@mail.com",
        password: "roles_mytester",
        token: null,
        _id: null
    };

    let friend = {
        name: "roles_Friend",
        email: "roles_friend@maestrousers.com",
        password: "roles_mytester",
        token: null,
        _id: null
    };

    let applications = {
        name: "MyApplication"
    };

    const conn = process.env.MONGO_URL+'_roles';
    before(function (done) {
      app = require('./libs/bootApp')(conn);

      app.once('start', done);
      mock = app.listen(1345);
    });


    after(function (done) {
      cleaner_db([{tb: 'users', ids: [user, friend]}], done, mock, conn);
    });


    describe('create new user', function () {
        it('Create account - success', function (done) {
            request(mock)
                .post('/users')
                .send(user)
                .expect(201)
                .expect('Content-Type', /json/)
                .expect(/\"name\":\"roles_MaestroUsers\"/)
                .expect(/roles_maestro@maestrousers\.com/)
                .expect(/_id/)
                .expect((res) => {
                    user._id = res.body._id;
                })
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
                .expect(/\"name\":\"roles_Friend\"/)
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
                .expect((res) => {
                    user.token = res.body.token;
                })
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('Exist user - get friend token', function (done) {
            request(mock)
                .post('/users/auth')
                .send(friend)
                .expect(200)
                .expect('Content-Type', /json/)
                .expect((res) => {
                    friend.token = res.body.token;
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
              .send(applications)
              .set('Authorization', `JWT ${user.token}`)
              .expect(201)
              .expect('Content-Type', /json/)
              .expect(/MyApplication/)
              .expect(/_id/)
              .expect(function(res) {
                  Object.assign(applications, res.body);
              })
              .end(function (err) {
                  if (err) return done(err);
                  done(err);
              });
      });
    });

    /**
    *
    * Add member
    * @depends create user
    * @description I like to add my friend in my team with read role
    */
    describe('add member into application - role 1', function () {

      it('Exist application - add roles', function (done) {
          const data = {role: "1", id: friend._id, refs: "users", name: friend.name, email: friend.email};

          request(mock)
              .post('/applications/'+applications._id+'/roles')
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

    });

    describe('test get and try to update team with friend', function () {
      it('Exist application - update application with valid data', function (done) {
          request(mock)
              .get('/applications/'+applications._id)
              .set('Authorization', `JWT ${friend.token}`)
              .expect(200)
              .expect('Content-Type', /json/)
              .expect(/\"name\":\"MyApplication\"/)
              .end(function (err) {
                  if (err) return done(err);
                  done(err);
              });
      });

      it('Exist application - update application with valid data', function (done) {

          request(mock)
              .patch('/applications/'+applications._id)
              .send({name: "ChangeName"})
              .set('Authorization', `JWT ${friend.token}`)
              .expect(400)
              .expect('Content-Type', /json/)
              .end(function (err) {
                  if (err) return done(err);
                  done(err);
              });
      });

      it('Exist application - delete team', function (done) {

          request(mock)
              .delete('/applications/'+applications._id)
              .set('Authorization', `JWT ${friend.token}`)
              .expect(400)
              .end(function (err) {
                  if (err) return done(err);
                  done(err);
              });
      });
    });

    /**
    *
    * Update role member
    * @depends create user
    * @description I like to escalate role for write
    */
    describe('update role friend into 3', function () {

      it('Exist roles - update role 3 application', function (done) {
          const data = {role: "3", refs: "users", name: friend.name, email: friend.email};

          request(mock)
              .put('/applications/'+applications._id+"/roles/"+friend._id)
              .send(data)
              .set('Authorization', `JWT ${user.token}`)
              .expect(201)
              .expect('Content-Type', /json/)
              .expect(/\"role\"\:3/)
              .end(function (err) {
                  if (err) return done(err);
                  done(err);
              });
      });

    });

    describe('test get and update team with friend', function () {
      it('Exist application - update application with valid data', function (done) {
          request(mock)
              .get('/applications/'+applications._id)
              .set('Authorization', `JWT ${friend.token}`)
              .expect(200)
              .expect('Content-Type', /json/)
              .expect(/\"name\":\"MyApplication\"/)
              .end(function (err) {
                  if (err) return done(err);
                  done(err);
              });
      });

      it('Exist application - update application with valid data', function (done) {

          request(mock)
              .patch('/applications/'+applications._id)
              .send({name: "ChangeName"})
              .set('Authorization', `JWT ${friend.token}`)
              .expect(202)
              .expect('Content-Type', /json/)
              .end(function (err) {
                  if (err) return done(err);
                  done(err);
              });
      });

      it('Exist application - delete team', function (done) {

          request(mock)
              .delete('/applications/'+applications._id)
              .set('Authorization', `JWT ${friend.token}`)
              .expect(400)
              .end(function (err) {
                  if (err) return done(err);
                  done(err);
              });
      });

    });


    /**
    *
    * Update role member
    * @depends create user
    * @description I like to escalate role for admin
    */
    describe('update role friend into 7', function () {

      it('Exist roles - update role 7 application', function (done) {
          request(mock)
              .put('/applications/'+applications._id+"/roles/"+friend._id)
              .send({role: "7", refs: "users", name: friend.name, email: friend.email})
              .set('Authorization', `JWT ${user.token}`)
              .expect(201)
              .expect('Content-Type', /json/)
              .expect(/\"role\"\:7/)
              .end(function (err) {
                  if (err) return done(err);
                  done(err);
              });
      });
    });

    describe('delete the team', function () {
      it('Exist application - update application with valid data', function (done) {
          request(mock)
              .get('/applications/'+applications._id)
              .set('Authorization', `JWT ${friend.token}`)
              .expect(200)
              .expect('Content-Type', /json/)
              .end(function (err) {
                  if (err) return done(err);
                  done(err);
              });
      });

      it('Exist application - update application with valid data', function (done) {

          request(mock)
              .patch('/applications/'+applications._id)
              .send({name: "ChangeName"})
              .set('Authorization', `JWT ${friend.token}`)
              .expect(202)
              .expect('Content-Type', /json/)
              .end(function (err) {
                  if (err) return done(err);
                  done(err);
              });
      });

      it('Exist application - delete team', function (done) {

          request(mock)
              .delete('/applications/'+applications._id)
              .set('Authorization', `JWT ${friend.token}`)
              .expect(204)
              .end(function (err) {
                  if (err) return done(err);
                  done(err);
              });
      });

    });


});
