'use strict';

const _ = require('lodash');
const batchInsert = require('./batch/batch');


const SchedulerBatch = (req, connection) => (PersistenceServices) => {

    return {
        batch(discovery_tasks) {
            const {provider, _id, name} = connection;

            const conducter = _.chain(discovery_tasks)
                .get('items[0].value.permissions')
                .mapValues(e => _.get(e, '[0].init_job'))
                .reduce((arr, value, key) => {
                    if(value)
                        arr.push(key);
                    return arr;
                }, [])
                .map(task => {
                    const refs = 'connections';
                    const body = {name, _id, provider, task, refs};
                    return batchInsert(body, req, PersistenceServices);
                })
                .value();


            return Promise.all(conducter);
        }
    };
};

module.exports = SchedulerBatch;
