'use strict';

const _ = require('lodash');

const DBRepositoryBatch = (Entity, options = {}) => {

    const DB = Entity.dao;

    return {
        batch(post) {

            return new Promise((resolve, reject) => {

                return new DB()
                    .updateBatch(post, options)
                    .then((e) => _.pick(e, 'isBatch'))
                    .then(resolve)
                    .catch(reject);
            });
        }
    };
};

module.exports = DBRepositoryBatch;
