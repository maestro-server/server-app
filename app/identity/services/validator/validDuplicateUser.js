'use strict';

const _ = require('lodash');
const ConflictError = require('core/errors/factoryError')('ConflictError');

module.exports = function (DBRepository, post) {

    return new Promise((resolve, reject) => {
        const email = _.get(post, 'email', 'notExist');

        DBRepository
            .findOne({email})
            .then(result => {
                if (!_.isEmpty(result)) {
                    const errors = [{failed: email}];
                    throw new ConflictError(errors, "User already exist");
                }

                resolve(post);
            })
            .catch(reject);

    });


};
