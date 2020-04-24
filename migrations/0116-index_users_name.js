'use strict';

const coll = "users"
const name = `${coll}_active_name`

exports.up = function (db, next) {
    let pets = db.collection(coll);
    pets.createIndex({
        "email": 1
    }, {name}, next);
};

exports.down = function (db, next) {
    let pets = db.collection(coll);

    pets.dropIndex(name, next);
};
