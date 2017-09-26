'use strict';


exports.up = function (db, next) {
    let pets = db.collection('adminer');
    pets.insert({
        "value": {
            environment: ['Production', 'Staging', 'Development', 'UTA', 'Training', 'SandBox'],
            third: ['ApiGateway (AWS)', 'Akamai', 'Cloudflare', 'TyK', 'IBM ApiGateway'],
            own: ['Kong', 'Nginx', 'StrongLoop API', 'WSO2 API', 'Java Spring Cloud', 'Netflix (Hystrix/Zuul)', 'TyK']
        },
        "key": "apigateway_options",
        "active": true,
        "updated_at": new Date()
    }, next);
};

exports.down = function (db, next) {
    let pets = db.collection('adminer');

    pets.findAndModify({key: 'apigateway_options'}, [], {}, {remove: true}, next);
};
