'use strict';


exports.up = function (db, next) {
    let pets = db.collection('adminer');
    pets.insert({
        "value": {
            environment: ['Production', 'Staging', 'Development', 'UTA', 'Training', 'SandBox'],
            third: ['GCE discovery', 'Bluemix SD'],
            own: ['Hashcorp Consul', 'Etcd', 'Rancher', 'Kurbenetes', 'Marathon', 'Eureka', 'NSQ', 'Serf', 'SkyDNS', 'Zookeeper', 'Nerve SD', 'Serverset SD', 'Triton SD']
        },
        "key": "servicediscovery_options",
        "active": true,
        "updated_at": new Date()
    }, next);
};

exports.down = function (db, next) {
    let pets = db.collection('adminer');

    pets.findAndModify({key: 'servicediscovery_options'}, [], {}, {remove: true}, next);
};
