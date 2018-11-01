'use strict';

const _ = require('lodash');
const PersistenceServices = require('core/services/PersistenceServices');
const Adminer = require('adminer/entities/Adminer');

const connections = function () {
    const module = 'connections';
    let template = null;

    const populate = async function () {
        try {
            const res = await PersistenceServices(Adminer)
            .find({key: 'scheduler_options'}, {});

            return _.chain(res)
                .head()
                .head()
                .get('value.configs')
                .filter(f => f.name === module)
                .head()
                .pick(['method', 'url', 'options'])
                .value();
        } catch(e) {
            console.log(e);
        }
    };


    return {
        async render(data) {
            if (!template)
                template = await populate();

            const {task, _id} = data;
            const interval = _.chain(template)
                .get('options')
                .filter((e, k) => k == task)
                .head()
                .value();

            const endpoint = _.reduce(data, (result, value, key) => _.replace(result, `<${key}>`, value), _.get(template, 'url'));
            const now = Date.now();

            return {
                "name": `${module} - ${task} - ${_id} (${now})`,
                "method": _.get(template, 'method'),
                "enabled": true,
                "period_type": "interval",
                "task": module,
                "run_immediately": true,
                'source': _.get(template, 'sopurce'),
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
