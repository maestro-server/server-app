"use strict";

require('app-module-path').addPath(`${__dirname}/../../../app`); //make more realiable to call modules

const _ = require('lodash');
let MongoClient = require("mongodb").MongoClient;
const dbpath = require('core/libs/dbpath')();

const interactC = function (db, collections) {
  let pros=[];


  collections.forEach((collection) => {
    let ids = {};

    if(_.get(collection, 'ids')) {
      const list = _.map(collection.ids, (e)=>e._id);

      ids = {'_id': {$in: list}};
    }

    db.collection(collection.tb, ids, (err1, coll) => {
        pros.push(coll.remove({}));
    });

  });

  return pros;
};

module.exports = function (collections, done, mock, conn = dbpath) {
  const strOpts = {
    useUnifiedTopology: true,
    useNewUrlParser: true
  };

  MongoClient.connect(conn, strOpts)
      .then((db) => {

        const pros = interactC(db, collections);

        Promise.all(pros)
          .then(() => {
            done();
            db.close();
            //mock.close(done);
          });
      });
};
