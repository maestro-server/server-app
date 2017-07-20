'use strict';

exports.up = function (db, next) {
    let pets = db.collection('adminer');
    pets.insert({
        "value": {
          provider: ['AWS', 'OpenStack'],
          baser: {
            'AWS': [
              {region: 'sa-east-1 (South America)', zones: ['sa-east-1a', 'sa-east-1b', 'sa-east-1c']},
              {region: 'us-east-1 (US East (Virginia)', zones: ['us-east-1a', 'us-east-1b', 'us-east-1c']},
              {region: 'us-east-2 (US East (Ohio))', zones: ['us-east-2a', 'us-east-2b', 'us-east-2c']}
            ],
            'OpenStack': []
          },
          connections: {
            openstack: ['SSl without validation', 'SSL', 'Non-SSl']
          }
        },
        "key": "datacenter_options",
        "active": true,
        "updated_at": new Date()
    }, next);
};

exports.down = function (db, next) {
    let pets = db.collection('adminer');

    pets.findAndModify({key: 'datacenter_options'}, [], {}, {remove: true}, next);
};
