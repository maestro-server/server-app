'use strict';

const _ = require('lodash');
const ConflictError = require('core/errors/factoryError')('ConflictError');

module.exports = function (DBRepository, post) {

    return new Promise((resolve, reject) => {
        const {email} = post;

        DBRepository
            .findOne({email})
            .then(result => {

                if (!_.isEmpty(result)) {
                    let errors = [{failed: email}];
                    throw new ConflictError(errors, "User already exist");
                }

                resolve(post);
            })
            .catch(e => {
                reject(e);
            });

    });


};
