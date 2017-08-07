'use strict';

exports.up = function (db, next) {
    let pets = db.collection('adminer');
    pets.insert({
        "value": {
          provider: ['AWS', 'OpenStack'],
          baser: {
            'AWS': [
              {region: 'us-east-1 (N. Virginia)', zones: ['us-east-1a', 'us-east-1b', 'us-east-1c']},
              {region: 'us-east-2 (Ohio)', zones: ['us-east-2a', 'us-east-2b', 'us-east-2c']},
              {region: 'us-west-2 (Oregon)', zones: []},
              {region: 'ca-central-1 (Central)', zones: []},
              {region: 'eu-west-1 (Ireland)', zones: []},
              {region: 'eu-central-1 (Frankfurt)', zones: []},
              {region: 'eu-west-2 (London)', zones: []},
              {region: 'ap-northeast-1 (Tokyo)', zones: []},
              {region: 'ap-northeast-2 (Seoul)', zones: []},
              {region: 'ap-southeast-1 (Singapore)', zones: []},
              {region: 'ap-southeast-2 (Sydney)', zones: []},
              {region: 'ap-south-1 (Mumbai)', zones: []},
              {region: 'sa-east-1 (São Paulo)', zones: ['sa-east-1a', 'sa-east-1b', 'sa-east-1c']}
            ],
            'OpenStack': [],
            'Google Cloud Engine': [
              {region: 'Central US', zones: []},
              {region: 'East Asia', zones: []},
              {region: 'Eastern US', zones: []},
              {region: 'Western Europe', zones: []}
            ]
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
