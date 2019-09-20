"use strict";

let MongoClient = require("mongodb").MongoClient;
const dbpath = require('../../../app/core/libs/dbpath')();
const dbname = require('../../../app/core/libs/dbname')();

module.exports = function (data, table, done, conn = dbpath) {
    const strOpts = {
        useUnifiedTopology: true,
        useNewUrlParser: true
      };

    MongoClient.connect(conn, strOpts)
        .then((client) => {
            const db = client.db(dbname);
            let pets = db.collection(table);
            pets.insertOne(data, done);
        });
};
