'use strict';

const _ = require('lodash')
const PersistenceServices = require('core/services/PersistenceServices');
const Adminer = require('adminer/entities/Adminer');

const co = require('co');

const connections = function () {
    const module = 'connections';
    let template = {};

    co(function* () {
        return yield PersistenceServices(Adminer)
            .find({key: 'scheduler_options'}, {})
        })
        .then(e => {
            template = _.chain(e)
                .head()
                .head()
                .get('value.configs')
                .filter(f => f.name === module)
                .head()
                .pick(['method', 'url', 'options'])
                .value();
        })
        .catch(console.error);

    return {
        render(data) {
            const {task, _id} = data;
            const interval = _.chain(template)
                .get('options')
                .filter((e, k) => k == task)
                .head()
                .value();

            data['url_discovery'] = process.env.MAESTRO_DISCOVERY_URL || 'http://discovery:5000';
            const endpoint = _.reduce(data, (result, value, key) => _.replace(result, `<${key}>`, value), _.get(template, 'url'));
            const now = Date.now();

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
