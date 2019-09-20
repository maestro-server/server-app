"use strict";

const _ = require('lodash');
let MongoClient = require("mongodb").MongoClient;
const dbpath = require('core/libs/dbpath')();
const dbname = require('core/libs/dbname')();

module.exports = function (data, table, done, conn = dbpath) {
    const strOpts = {
        useUnifiedTopology: true,
        useNewUrlParser: true
      };

    MongoClient.connect(conn, strOpts)
        .then((client) => {
            const db = client.db(dbname);

            let pets = db.collection(table);
            pets.insertMany(data, done);
        });
};
