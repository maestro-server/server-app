'use strict';


exports.up = function (db, next) {
    let pets = db.collection('adminer');
    pets.insert({
        "value": {
            environment: ['Production', 'Staging', 'Development', 'UTA', 'Training', 'SandBox'],
            third: ['CloundFront (AWS)', 'Azure CDN', 'Akamai', 'CloudFlare', 'MaxCDN', 'Aryaka', 'Beluga CDN', 'CacheFly', 'CDN.net', 'CDNetwortks', 'CDN77', 'CDNSun', 'CenterServ', 'ChinaCache', 'Cotendo', 'Distil Networks', 'Fastly', 'HP Cloud Services', 'Incapsula', 'Instart Logic', 'KeyCDN', 'LeaseWeb', 'Meta CDN', 'OVH', 'Rackspace Cloud files', 'Setplex', 'Speedera Networks', 'StreamZilla'],
            own: []
        },
        "key": "cdn_options",
        "active": true,
        "updated_at": new Date()
    }, next);
};

exports.down = function (db, next) {
    let pets = db.collection('adminer');

    pets.findAndModify({key: 'cdn_options'}, [], {}, {remove: true}, next);
};
