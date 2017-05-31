/*global describe:false, it:false, beforeEach:false, afterEach:false*/

'use strict';


let kraken = require('kraken-js'),
    chai = require('chai'),
    path = require('path'),
    request = require('supertest'),
    cleaner_db = require('./libs/cleaner_db'),
    {expect} = chai;



describe('e2e projects', function () {

    let app, mock;

    let user = {
        name: "MaestroUsers",
        email: "maestro@maestrousers.com",
        newemail: "mynew@mail.com",
        password: "mytester",
        token: null,
        _id: null
    };

    let projects = [{
        name: "MyProject"
    }, {
        name: "SecondProject"
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


    describe('e2e users: create new user', function () {
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

    describe('e2e users: get token', function () {
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
    * Create project
    * @depends create project
    * @description I like to create a new project
    */
    describe('create project', function () {
      it('Create project - create project', function (done) {
          request(mock)
              .post('/projects')
              .send(projects[0])
              .set('Authorization', `JWT ${user.token}`)
              .expect(201)
              .expect('Content-Type', /json/)
              .expect(/MyProject/)
              .expect(/_id/)
              .end(function (err) {
                  if (err) return done(projecterr);
                  done(err);
              });
      });

      it('Create project - create project without token', function (done) {
          request(mock)
              .post('/projects')
              .send(projects[0])
              .expect(401)
              .end(function (err) {
                  if (err) return done(err);
                  done(err);
              });
      });

      it('Create project - create second project', function (done) {
          request(mock)
              .post('/projects')
              .send(projects[1])
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

      it('Create project - validate fail project', function (done) {
          request(mock)
              .post('/projects')
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
    * Read project
    * @depends read project
    * @description I like to see my projects
    */
    describe('read project', function () {
      it('Exist project - list my project', function (done) {
          request(mock)
              .get('/projects')
              .set('Authorization', `JWT ${user.token}`)
              .expect(200)
              .expect('Content-Type', /json/)
              .expect(/\"name\":\"MyProject\"/)
              .expect(/_id/)
              .expect(function(res) {
                  expect(res.body.items).to.have.length(2);
              })
              .expect(function(res) {
                  Object.assign(projects[0], res.body.items[0]);
                  Object.assign(projects[1], res.body.items[1]);
              })
              .end(function (err) {
                  if (err) return done(err);
                  done(err);
              });
      });

      it('Exist project - list my project without token', function (done) {
          request(mock)
              .get('/projects')
              .expect(401)
              .end(function (err) {
                  if (err) return done(err);
                  done(err);
              });
      });

      it('Exist project - list my project with filter', function (done) {
          request(mock)
              .get('/projects')
              .query({name: projects[0].name})
              .set('Authorization', `JWT ${user.token}`)
              .expect(200)
              .expect('Content-Type', /json/)
              .expect(/name"/)
              .expect(/_id/)
              .expect(function(res) {
                  expect(res.body.items).to.have.length(1);
              })
              .end(function (err) {
                  if (err) return done(err);
                  done(err);
              });
      });

      it('Exist project - see my new project', function (done) {
          request(mock)
              .get('/projects/'+projects[0]._id)
              .set('Authorization', `JWT ${user.token}`)
              .expect(200)
              .expect('Content-Type', /json/)
              .expect(/name/)
              .end(function (err) {
                  if (err) return done(err);
                  done(err);
              });
      });

      it('Exist project - see my new project without token', function (done) {
          request(mock)
              .get('/projects/'+projects[0]._id)
              .expect(401)
              .end(function (err) {
                  if (err) return done(err);
                  done(err);
              });
      });

      it('Exist project -  autocomplete', function (done) {
          request(mock)
              .get('/projects/autocomplete')
              .query({complete: "My"})
              .set('Authorization', `JWT ${user.token}`)
              .expect(200)
              .expect('Content-Type', /json/)
              .expect(/name"/)
              .expect(/_id/)
              .expect(function(res) {
                  expect(res.body.items).to.have.length(1);
              })
              .end(function (err) {
                  if (err) return done(err);
                  done(err);
              });
      });

      it('Exist project -  autocomplete without token', function (done) {
          request(mock)
              .get('/projects/autocomplete')
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
    * Update project
    * @depends update project
    * @description I like to update my project
    */
    describe('update project', function () {
      it('Exist project - update project with valid data', function (done) {
          const data = Object.assign(projects[0], {name: "ChangeName"});

          request(mock)
              .patch('/projects/'+projects[0]._id)
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

      it('Exist project - invalid data to update project', function (done) {
          request(mock)
              .patch('/projects/'+projects[0]._id)
              .send({})
              .set('Authorization', `JWT ${user.token}`)
              .expect(422)
              .end(function (err) {
                  if (err) return done(err);
                  done(err);
              });
      });

      it('Exist project - try to update project without token', function (done) {
          const data = Object.assign(projects[0], {name: "ChangeName"});

          request(mock)
              .patch('/projects/'+projects[0]._id)
              .send(data)
              .expect(401)
              .end(function (err) {
                  if (err) return done(err);
                  done(err);
              });
      });
    });

    describe('confirm update project', function () {
      it('Exist projects - confirm my changes', function (done) {
          request(mock)
              .get('/projects/'+projects[0]._id)
              .set('Authorization', `JWT ${user.token}`)
              .expect(200)
              .expect('Content-Type', /json/)
              .expect(/ChangeName/)
              .end(function (err) {
                  if (err) return done(err);
                  done(err);
              });
      });

      it('Exist project - confirm if my update dont create a new project', function (done) {
          request(mock)
              .get('/projects')
              .set('Authorization', `JWT ${user.token}`)
              .expect(200)
              .expect('Content-Type', /json/)
              .expect(/\"name\":\"MyProject\"/)
              .expect(/_id/)
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
    * Delete project
    * @depends delete project
    * @description I like to delete my project
    */
    describe('delete project', function () {
      it('Exist members - delete my project', function (done) {
          request(mock)
              .delete('/projects/'+projects[0]._id)
              .set('Authorization', `JWT ${user.token}`)
              .expect(204)
              .end(function (err) {
                  if (err) return done(err);
                  done(err);
              });
      });
    });

    describe('confirm delete project', function () {
      it('Exist members - delete my project', function (done) {
          request(mock)
              .get('/projects/')
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

      it('Exist project -  autocomplete', function (done) {
          request(mock)
              .get('/projects/autocomplete')
              .query({complete: "Second"})
              .set('Authorization', `JWT ${user.token}`)
              .expect(200)
              .expect('Content-Type', /json/)
              .expect(function(res) {
                  expect(res.body.items).to.have.length(0);
              })
              .end(function (err) {
                  if (err) return done(err);
                  done(err);
              });
      });
    });

});
