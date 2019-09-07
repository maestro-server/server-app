'use strict';


exports.up = function (db, next) {
    let pets = db.collection('adminer');
    pets.insertOne({
        "value": {
          ia_type: ['bot', 'translate', 'recognition']
        },
        "key": "ia_options",
        "active": true,
        "updated_at": new Date()
    }, next);
};

exports.down = function (db, next) {
    let pets = db.collection('adminer');

    pets.findOneAndDelete({key: 'env_options'}, next);
};
