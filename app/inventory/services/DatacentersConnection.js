'use strict';

const _ = require('lodash');
const Datacenter = require('..//entities/Datacenter');


const DatacentersConnection = (result, req, PersistenceServices, Entity) => {
    const dc_id = _.get(result, 'dc_id');

    return {
        connected() {
            return new Promise((resolve, reject) => {
                const sucessed = true;
                return PersistenceServices(Datacenter)
                    .findOne(dc_id, req.user)
                    .then(e => {
                        const merge = _.assign({}, _.pick(e, ['name', 'provider']), {sucessed});
                        PersistenceServices(Datacenter).patch(dc_id, merge, req.user);
                    })
                    .then(resolve)
                    .catch(reject);
            });
        },
        disconnected() {
            return new Promise((resolve, reject) => {
                const sucessed = false;
                const dc = _.pick(result, ['provider']);

                return PersistenceServices(Entity)
                    .find({dc_id}, req.user)
                    .then(e => {
                        const merge = _.assign({}, dc, {sucessed});
                        if (_.head(e).length <= 1)
                            return PersistenceServices(Datacenter).patch(dc_id, merge, req.user);
                    })
                    .then(resolve)
                    .catch(reject);
            });
        }
    };
};

module.exports = DatacentersConnection;
