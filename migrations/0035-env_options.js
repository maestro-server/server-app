'use strict';


exports.up = function (db, next) {
    let pets = db.collection('adminer');
    pets.insert({
        "value": {
          environment: ['Production', 'Staging', 'Development', 'UTA', 'Training', 'SandBox']
        },
        "key": "env_options",
        "active": true,
        "updated_at": new Date()
    }, next);
};

exports.down = function (db, next) {
    let pets = db.collection('adminer');

    pets.findAndModify({key: 'env_options'}, [], {}, {remove: true}, next);
};
