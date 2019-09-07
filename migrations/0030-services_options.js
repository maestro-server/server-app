'use strict';


exports.up = function (db, next) {
    let pets = db.collection('adminer');
    pets.insertOne({
        "value": {
            managers: ['SystV', 'SystemCtl', 'Upstart']
        },
        "key": "services_options",
        "active": true,
        "updated_at": new Date()
    }, next);
};

exports.down = function (db, next) {
    let pets = db.collection('adminer');

    pets.findOneAndDelete({key: 'services_options'}, next);
};
