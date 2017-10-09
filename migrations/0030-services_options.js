'use strict';


exports.up = function (db, next) {
    let pets = db.collection('adminer');
    pets.insert({
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

    pets.findAndModify({key: 'services_options'}, [], {}, {remove: true}, next);
};
