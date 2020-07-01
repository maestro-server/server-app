'use strict';

const coll = "servers"
const name = `${coll}_ipv4`

exports.up = function (db, next) {
    let pets = db.collection(coll);
    pets.createIndex({
        "ipv4_private": 1
    }, {name, sparse: true}, next);
};

exports.down = function (db, next) {
    let pets = db.collection(coll);

    pets.dropIndex(name, next);
};
