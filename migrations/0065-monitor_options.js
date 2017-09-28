'use strict';


exports.up = function (db, next) {
    let pets = db.collection('adminer');
    pets.insert({
        "value": {
            environment: ['Production', 'Staging', 'Development', 'UTA', 'Training', 'SandBox'],
            third: ['CloudWatch (AWS)', 'Azure Monitoring', 'Google Cloud Monitoring', 'Digital Ocean Monitoring', 'NewRelic', 'DataDog', 'site24x7', 'Dynatrace APM', 'RollBar', 'Pingdom Server', 'Traceview', 'Atatus', 'UpTime CloudWatch', 'Ruxit', 'Stackify', 'Solarwinds', 'LogicMonitor', 'Okmeter.io', 'PageDuty', 'Logz.io (ELK Stack)'],
            own: ['Nagios', 'Zabbix', 'ELK Stack', 'GrayLog', 'Prometheus', 'Sensu', 'InfluxDb', 'Graphite', 'OpenTSDB']
        },
        "key": "monitor_options",
        "active": true,
        "updated_at": new Date()
    }, next);
};

exports.down = function (db, next) {
    let pets = db.collection('adminer');

    pets.findAndModify({key: 'monitor_options'}, [], {}, {remove: true}, next);
};
