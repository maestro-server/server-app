'use strict';


exports.up = function (db, next) {
    let pets = db.collection('adminer');
    pets.insert({
        "value": {
            environment: ['Production', 'Staging', 'Development', 'UTA', 'Training', 'SandBox'],
            third: ['AWS Elastic Cache', 'Azure', 'Google Cloud', 'Akamai', 'CloudFlare', 'GridGain Systems'],
            own: ['Redis', 'Memcache', 'Varnish', 'Oracle Coherence', 'Apache Ignite']
        },
        "key": "cache_options",
        "active": true,
        "updated_at": new Date()
    }, next);
};

exports.down = function (db, next) {
    let pets = db.collection('adminer');

    pets.findAndModify({key: 'cache_options'}, [], {}, {remove: true}, next);
};
