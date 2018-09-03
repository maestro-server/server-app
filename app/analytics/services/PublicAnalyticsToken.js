'use strict';

const _ = require('lodash');
const FactoryDBRepository = require('core/repositories/DBRepository');


const PublicAnalyticsToken = (Entity) => {

    const DBRepository = FactoryDBRepository(Entity);

    return {
        generate (id, owner_id) {

            return new Promise((resolve, reject) => {
                resolve("ok");
                
            });
        }
    };

};

module.exports = PublicAnalyticsToken;
