'use strict';

const _ = require('lodash');
const Datacenter = require('..//entities/Datacenter');


const DatacentersConnection = (result, req, PersistenceServices, Entity) => {
    const dc_id = _.get(result, 'dc_id')
    if (dc_id) {
        return PersistenceServices(Entity)
            .find({dc_id}, req.user)
            .then(e => {
                if (_.head(e).length <= 1)
                    PersistenceServices(Datacenter).patch(dc_id, {'sucessed': false}, req.user);
            });
    }
};

module.exports = DatacentersConnection;
