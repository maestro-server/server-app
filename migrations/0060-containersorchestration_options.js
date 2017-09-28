'use strict';


exports.up = function (db, next) {
    let pets = db.collection('adminer');
    pets.insert({
        "value": {
            environment: ['Production', 'Staging', 'Development', 'UTA', 'Training', 'SandBox'],
            third: ['Stackto', 'TuTum', 'ECS (AWS)', 'Google Cloud (K8S)', 'Azure Container Service'],
            own: ['Rancher', 'Kurbenetes', 'OpenShift Origin', 'Docker Swarm', 'DC/OS', 'Marathon', 'Portainer', 'Panamax', 'Cloudift', 'Shipyard']
        },
        "key": "containerorchestration_options",
        "active": true,
        "updated_at": new Date()
    }, next);
};

exports.down = function (db, next) {
    let pets = db.collection('adminer');

    pets.findAndModify({key: 'containerorchestration_options'}, [], {}, {remove: true}, next);
};
