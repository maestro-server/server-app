"use strict";

const _ = require('lodash');
let MongoClient = require("mongodb").MongoClient;

module.exports = function (data, table, done, conn = process.env.MAESTRO_MONGO_URI) {
    MongoClient.connect('mongodb://'+conn)
        .then((db) => {
            let pets = db.collection(table);
            pets.insert(data, done);
        });
};
