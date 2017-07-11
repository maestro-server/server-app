'use strict';

exports.up = function (db, next) {
    let pets = db.collection('adminer');
    pets.insert({
        "value" : [
            "production",
            "staging",
            "develop",
            "uta"
        ],
        "key" : "server_env",
        "active" : true,
        "updated_at" : new Date()
    }, next);
};

exports.down = function (db, next) {
    let pets = db.collection('adminer');

    pets.findAndModify({key: 'server_env'}, [], {}, { remove: true }, next);
};
