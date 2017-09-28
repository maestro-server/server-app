'use strict';


exports.up = function (db, next) {
    let pets = db.collection('adminer');
    pets.insert({
        "value": {
            environment: ['Production', 'Staging', 'Development', 'UTA', 'Training', 'SandBox'],
            third: ['AWS Cloud Trails', 'NewRelic', 'DataDog', 'site24x7', 'RollBar', 'Logz.io (ELK Stack)', 'Splunk', 'Papertrail', 'Loggly', 'AlertLogic Log Manager', 'WhatsUpGold', 'Tibco', 'GFI EventsManager', 'SolarWinds Log', 'ManageEngine EventLogAnalyzer', 'Tripwire', 'NetIQ', 'InTrust', 'LogRhythm', 'Sumo Logic'],
            own: ['GrayLog', 'ELK Stack', 'Fluentd', 'RSyslog', 'Logstash', 'Chukwa']
        },
        "key": "logs_options",
        "active": true,
        "updated_at": new Date()
    }, next);
};

exports.down = function (db, next) {
    let pets = db.collection('adminer');

    pets.findAndModify({key: 'logs_options'}, [], {}, {remove: true}, next);
};
