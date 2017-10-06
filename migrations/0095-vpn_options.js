'use strict';


exports.up = function (db, next) {
    let pets = db.collection('adminer');
    pets.insert({
        "value": {
            environment: ['Production', 'Staging', 'Development', 'UTA', 'Training', 'SandBox'],
            third: ['Vpn (AWS)'],
            own: ['OpenVPN', 'OpenSwan', 'Hacoon', 'Check Point', 'Cisco']
        },
        "key": "vpn_options",
        "active": true,
        "updated_at": new Date()
    }, next);
};

exports.down = function (db, next) {
    let pets = db.collection('adminer');

    pets.findAndModify({key: 'vpn_options'}, [], {}, {remove: true}, next);
};
