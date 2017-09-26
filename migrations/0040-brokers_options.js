'use strict';


exports.up = function (db, next) {
    let pets = db.collection('adminer');
    pets.insert({
        "value": {
            environment: ['Production', 'Staging', 'Development', 'UTA', 'Training', 'SandBox'],
            third: ['SQS (AWS)', 'IronMQ', 'Azure Service Bus', 'Google Cloud Pub/Sub', 'Pusher', 'Enduro/X ', 'Solace System'],
            own: ['RabbitMq', 'Kafka', 'ZeroMq', 'Beanstalkd', 'ActiveMQ', 'Qpid', 'Gearman', 'HornetQ', 'Oracle WebLogic JMS', 'IBM Websphere MQ', 'Tarantool']
        },
        "key": "brokers_options",
        "active": true,
        "updated_at": new Date()
    }, next);
};

exports.down = function (db, next) {
    let pets = db.collection('adminer');

    pets.findAndModify({key: 'brokers_options'}, [], {}, {remove: true}, next);
};
