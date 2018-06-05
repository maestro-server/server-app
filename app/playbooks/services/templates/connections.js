'use strict';

const _ = require('lodash')
const PersistenceServices = require('core/services/PersistenceServices');
const Adminer = require('adminer/entities/Adminer');

const co = require('co');


const connections = function () {
    const module = 'connections';
    let template = {};

    let aa = function() {
        return PersistenceServices(Adminer).find({key: 'scheduler_options'}, {});
    }



    return {
        async render(data) {
            let  response = await aa()

            template = _.chain(response)
                .head()
                .head()
                .get('value.configs')
                .filter(f => f.name === module)
                .head()
                .pick(['method', 'url', 'options'])
                .value();

            console.log(response)
            const {task, _id} = data;
            const interval = _.chain(template)
                .get('options')
                .filter((e, k) => k == task)
                .head()
                .value();

            data['url_discovery'] = process.env.MAESTRO_DISCOVERY_URL || 'http://discovery:5000';
            console.log(template)
            const endpoint = _.reduce(data, (result, value, key) => _.replace(result, `<${key}>`, value), _.get(template, 'url'));
            const now = Date.now();
            console.log(endpoint)
            return {
                "name": `${module} - ${task} - ${_id} (${now})`,
                "method": _.get(template, 'method'),
                "enabled": true,
                "period_type": "interval",
                "task": module,
                "run_immediately": true,
                interval,
                endpoint,
                link: {
                    name: _.get(data, 'name', _id),
                    _id,
                    task,
                    provider: _.get(data, 'provider')
                }
            };
        }
    };
};

module.exports = connections;
