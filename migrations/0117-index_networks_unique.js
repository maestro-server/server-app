'use strict';

const coll = "networks"
const name = `${coll}_unique`

exports.up = function (db, next) {
    let pets = db.collection(coll);
    pets.createIndex({
        "unique_id": 1
    }, {name, unique: true, sparse: true}, next);
};

exports.down = function (db, next) {
    let pets = db.collection(coll);

    pets.dropIndex(name, next);
};
