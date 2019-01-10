'use strict';

const _ = require('lodash');
const batchInsert = require('./batch/batch');


const SchedulerBatch = (req) => (PersistenceServices) => {

    return {
        batch(result) {
            const {provider, service, _id, name} = result[0];
            const conducter = _.chain(result[2])
                .get('items[0].value.permissions')
                .get(service)
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
