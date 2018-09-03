'use strict';

const tokenTransform = require('../transforms/public_analytics');

const PublicAnalyticsToken = (Entity) => {

    return {
        generate (id) {

            return new Promise((resolve, reject) => {
                try {
                    const pay = tokenTransform(id, Entity.name);
                    resolve(pay);
                } catch(error) {
                    reject(error);
                }
            });
        }
    };

};

module.exports = PublicAnalyticsToken;
