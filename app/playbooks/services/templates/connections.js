'use strict';

const PersistenceServices = require('core/services/PersistenceServices');
const Adminer = require('adminer/entities/Adminer');

const connections = () => {

    PersistenceServices(Adminer)
        .find()
        .then(console.log);

    return {
        render({task, refs, id_conn}) {
            console.log(task, refs, id_conn);
            const minutes = 2;
            const endpoint = "http://google.com.br";
        
            return {
                "name" : "all in one",
                "enabled" : true,
                "period_type" : "interval",
                "interval" : {
                    "period" : "minutes",
                    "every" : minutes
                },
                "module" : "connections",
                "method" : "PUT",
                endpoint
            };
        }
    };
}; 

module.exports = connections;