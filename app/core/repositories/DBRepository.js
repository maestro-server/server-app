'use strict';

const _ = require('lodash');

const Dao = require('./daos/DBConnector');
const ClosurePromesify = require('core/libs/factoryPromisefy');

const findFilledFormat = require('./transforms/findFilledFormat');
const activeTransform = require('./transforms/activeFormat');

const validAccessUpdater = require('./validator/validAccessUpdater');
const factoryValid = require('core/libs/factoryValid');

const DBRepository = (Entity, options={}) => {

    const DB = Dao(Entity);

    return {
        find (query, resFilled = Entity.resFilled) {

            return ClosurePromesify(() => {
                const limit = _.parseInt(query.limit);
                const page = _.parseInt(query.page);
                const skip = limit * (page - 1);

                const ascending = _.parseInt(_.get(query, 'ascending'));
                const direction = ascending ? 1 : -1;
                const orderBy = _.get(query, 'orderBy', 'created_at');

                const filter = findFilledFormat(query, Entity.filled);

                return DB
                    .limit(limit)
                    .skip(skip)
                    .sort(orderBy, direction)
                    .include(resFilled)
                    .find(filter)
                    .then((e) => _.map(e, (value) =>  value.get()));
            });
        },

        findOne(filters, resFilled = Entity.singleFilled) {

            return ClosurePromesify(() => {
                const filter = Object.assign({}, filters, activeTransform.active());

                return DB
                    .findOne(filter)
                    .then((e) => {
                        if (e)
                            e = e.get();

                        return _.pick(e, resFilled);
                    });
            });

        },

        count (filters = {}, fill = Entity.filled) {
            return ClosurePromesify(() => {
                const filter = findFilledFormat(filters, fill);
                return DB.count(filter);
            });
        },

        update(filter, post, fill = Entity.filled, resFilled = Entity.singleFilled) {

            return ClosurePromesify(() => {

                const data = findFilledFormat(post, fill);
                factoryValid(data, Entity.validators.update);

                return new DB(data)
                    .updateAndModify(filter, options)
                    .then(validAccessUpdater)
                    .then((e) => _.pick(e.get(), resFilled));

            });

        },

        updateByPushUnique(filter, post, fill = Entity.filled, resFilled = Entity.singleFilled) {

            return ClosurePromesify(() => {

                const data = _.pick(post, fill);

                return new DB(data)
                    .updateByPushUnique(filter, options)
                    .then(validAccessUpdater)
                    .then((e) => _.pick(e.get(), resFilled));

            });

        },

        updateByPull(filter, post, fill = Entity.filled, resFilled = Entity.singleFilled) {

            return ClosurePromesify(() => {

                const data = _.pick(post, fill);

                return new DB(data)
                    .updateByPull(filter, options)
                    .then(validAccessUpdater)
                    .then((e) => _.pick(e.get(), resFilled));
            });

        },

        create(post, fill = Entity.filled, resFilled = Entity.singleFilled) {

            return ClosurePromesify(() => {

                const data = findFilledFormat(post, fill);
                factoryValid(data, Entity.validators.create);

                return new DB(data)
                    .save()
                    .then((e) => _.pick(e.get(), resFilled));

            });

        },

        remove(filter) {

            return ClosurePromesify(() => {
                const data = activeTransform.desactive();

                return new DB(data)
                    .updateAndModify(filter)
                    .then(validAccessUpdater);

            });
        }
    };

};


module.exports = DBRepository;
