"use strict";

const _ = require('lodash');
let MongoClient = require("mongodb").MongoClient;
const dbpath = require('core/libs/dbpath')();

module.exports = function (data, table, done, conn = dbpath) {
    const strOpts = {
        useUnifiedTopology: true,
        useNewUrlParser: true
      };

    MongoClient.connect(conn, strOpts)
        .then((db) => {
            let pets = db.collection(table);
            pets.insert(data, done);
        });
};
