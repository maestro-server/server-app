'use strict';


exports.up = function (db, next) {
    let pets = db.collection('adminer');
    pets.insert({
        "value": {
            providers: ['ELB (AWS)', 'LB (Digital Ocean)', 'LB (Google Cloud)', 'LB (Azure)', 'F5 BigIP', 
            'Rancher (Cattle)', 'Kubernetes', 'HaProxy', 'Nginx', 'HTTPd', 'NAT']
        },
        "key": "lb_options",
        "active": true,
        "updated_at": new Date()
    }, next);
};

exports.down = function (db, next) {
    let pets = db.collection('adminer');

    pets.findAndModify({key: 'lb_options'}, [], {}, {remove: true}, next);
};
