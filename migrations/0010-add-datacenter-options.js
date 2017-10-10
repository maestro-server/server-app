'use strict';

exports.up = function (db, next) {
    let pets = db.collection('adminer');
    pets.insert({
        "value": {
          provider: ['AWS', 'OpenStack', 'Azure', 'IBM BlueMix', 'Digital Ocean', 'Linode', 'RackSpace',
          'Google CloudEngine', 'LocaWeb Jelastic', 'Heroku', 'OVH', 'GoDaddy'],
          baser: {
            'AWS': [
              {region: 'us-east-1 (N. Virginia)', zones: ['us-east-1a', 'us-east-1b', 'us-east-1c', 'us-east-1d', 'us-east-1e', 'us-east-1f']},
              {region: 'us-east-2 (Ohio)', zones: ['us-east-2a', 'us-east-2b', 'us-east-2c']},
              {region: 'us-west-1 (California)', zones: ['us-west-1b', 'us-west-1c']},
              {region: 'us-west-2 (Oregon)', zones: ['us-west-2a', 'us-west-2b', 'us-west-2c']},
              {region: 'ca-central-1 (Central)', zones: ['ca-central-1a', 'ca-central-1b']},
              {region: 'eu-west-1 (Ireland)', zones: ['eu-west-1a', 'eu-west-1b', 'eu-west-1c']},
              {region: 'eu-central-1 (Frankfurt)', zones: ['eu-central-1a', 'eu-central-1b', 'eu-central-1c']},
              {region: 'eu-west-2 (London)', zones: ['eu-west-2a', 'eu-west-2b']},
              {region: 'ap-northeast-1 (Tokyo)', zones: ['ap-northeast-1a', 'ap-northeast-1c']},
              {region: 'ap-northeast-2 (Seoul)', zones: ['ap-northeast-2a', 'ap-northeast-2b']},
              {region: 'ap-southeast-1 (Singapore)', zones: ['ap-southeast-1a', 'ap-southeast-1b']},
              {region: 'ap-southeast-2 (Sydney)', zones: ['ap-southeast-2a', 'ap-southeast-2b', 'ap-southeast-2c']},
              {region: 'ap-south-1 (Mumbai)', zones: ['ap-south-1a', 'ap-south-1b']},
              {region: 'sa-east-1 (São Paulo)', zones: ['sa-east-1a', 'sa-east-1b', 'sa-east-1c']}
            ],
            'OpenStack': [],
            'Azure': [],
            'IBM BlueMix': [],
            'Linode': [],
            'RackSpace': [],
            'Digital Ocean': [],
            'LocaWeb Jelastic': [],
            'Heroku': [],
            'OVH': [],
            'GoDaddy': [],
            'Google CloudEngine': [
              {region: 'us-west1 (North America)', zones: ['us-west1-a', 'us-west1-b', 'us-west1-c']},
              {region: 'us-east1 (North America)', zones: ['us-east1-b', 'us-east1-c', 'us-east1-d']},
              {region: 'us-east4 (North America)', zones: ['us-east4-a', 'us-east4-b', 'us-east4-c']},
              {region: 'us-central1 (North America)', zones: ['us-central1-a', 'us-central1-b', 'us-central1-c', 'us-central1-f']},
              {region: 'southamerica-east1 (South America)', zones: ['southamerica-east1-a', 'southamerica-east1-b', 'southamerica-east1-c']},
              {region: 'europe-west1 (Europe)', zones: ['europe-west1-b', 'europe-west1-c', 'europe-west1-d']},
              {region: 'europe-west2 (Europe)', zones: ['europe-west2-a', 'europe-west2-b', 'europe-west2-c']},
              {region: 'europe-west3 (Europe)', zones: ['europe-west3-a', 'europe-west3-b', 'europe-west3-c']},
              {region: 'asia-southeast1 (Asia)', zones: ['asia-southeast1-a', 'asia-southeast1-b']},
              {region: 'asia-east1 (Asia)', zones: ['asia-east1-a', 'asia-east1-b', 'asia-east1-c']},
              {region: 'asia-northeast1 (Asia)', zones: ['asia-northeast1-a', 'asia-northeast1-b', 'asia-northeast1-c']},
              {region: 'australia-southeast1 (Australia)', zones: ['australia-southeast1-a', 'australia-southeast1-b', 'australia-southeast1-c']}
            ]
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
