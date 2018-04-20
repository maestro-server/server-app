'use strict';

const _ = require('lodash');
const connections = require('./templates/connections');
const ValidatorError = require('core/errors/factoryError')('ValidatorError');

const TemplateScheduler = ({user}) => {

    const able = {
        'connections': connections(user)
    };

    return {
        template(body) {
            const refs = _.get(body, 'refs');
            if(!_.has(able, refs)) {
                const keys = _.reduce(able, (r, e, k)=>`${r}, ${k}`, '');
                throw new ValidatorError(`Refs not able, using only ${keys}`);
            }

            return able[refs].render(body);
        }
    };
};

module.exports = TemplateScheduler;
