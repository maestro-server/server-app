'use strict';

const coll = "snapshots"
const name = `${coll}_active_role`

exports.up = function (db, next) {
    let pets = db.collection(coll);
    pets.createIndex({
        'active': 1,
        "roles._id": 1,
        "roles.role": 1
    }, {name}, next);
};

exports.down = function (db, next) {
    let pets = db.collection(coll);

    pets.dropIndex(name, next);
};
