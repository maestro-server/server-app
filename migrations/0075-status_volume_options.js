'use strict';


exports.up = function (db, next) {
    let pets = db.collection('adminer');
    pets.insertOne({
        "value": {
            status: ['Active', 'Avaliable', 'Stopped', 'Deleted', 'Error']
        },
        "key": "status_volume_options",
        "active": true,
        "updated_at": new Date()
    }, next);
};

exports.down = function (db, next) {
    let pets = db.collection('adminer');

    pets.findOneAndDelete({key: 'status_volume_options'}, next);
};
