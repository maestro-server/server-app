"use strict";

let MongoClient = require("mongodb").MongoClient;
const dbpath = require('../../../app/core/libs/dbpath')();

module.exports = function (data, table, done, conn = dbpath) {
    MongoClient.connect('mongodb://'+conn)
        .then((db) => {
            let pets = db.collection(table);
            pets.insert(data, done);
        });
};
