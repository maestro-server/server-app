'use strict';

const _ = require('lodash');
const findFilledFormat = require('./transforms/findFilledFormat');
const activeTransform = require('./transforms/activeFormat');
const validAccessUpdater = require('./validator/validAccessUpdater');
const factoryValid = require('core/libs/factoryValid');

const DBRepository = (Entity, options = {}) => {

    const DB = Entity.dao;

    return {
        find(query, resFilled = Entity.resFilled) {
            return new Promise((resolve, reject) => {
                const limit = _.parseInt(query.limit);
                const page = _.parseInt(query.page);
                const skip = limit * (page - 1);

                const ascending = _.parseInt(_.get(query, 'ascending'));
                const direction = ascending ? 1 : -1;
                const orderBy = _.get(query, 'orderBy', 'updated_at');

                const filter = findFilledFormat(query, Entity.singleFilled);

                return DB
                    .limit(limit)
                    .skip(skip)
                    .sort(orderBy, direction)
                    .include(resFilled)
                    .find(filter)
                    .then((e) => _.map(e, (value) => value.get()))
                    .then(resolve)
                    .catch(reject);
            });
        },

        findOne(filters, resFilled = Entity.singleFilled) {
            return new Promise((resolve, reject) => {
                const filter = Object.assign({}, filters, activeTransform.active());

                return DB
                    .findOne(filter)
                    .then((e) => {
                        if (e)
                            e = e.get();

                        return _.pick(e, resFilled);
                    })
                    .then(resolve)
                    .catch(reject);

            });
        },

        count(filters = {}, fill = Entity.singleFilled) {
            return new Promise((resolve, reject) => {
                const filter = findFilledFormat(filters, fill);

                return DB.count(filter)
                    .then(resolve)
                    .catch(reject);
            });
        },

        update(filter, post, fill = Entity.filled, resFilled = Entity.singleFilled) {
            return new Promise((resolve, reject) => {
                const data = findFilledFormat(post, fill);
                factoryValid(data, Entity.validators.update);

                return new DB(data)
                    .updateFull(filter)
                    .then(validAccessUpdater)
                    .then((e) => _.pick(e.get(), resFilled))
                    .then(resolve)
                    .catch(reject);
            });
        },

        patch(filter, post, fill = Entity.filled, resFilled = Entity.singleFilled) {
            return new Promise((resolve, reject) => {
                const data = findFilledFormat(post, fill);
                factoryValid(data, Entity.validators.update);

                return new DB(data)
                    .updateAndModify(filter, options)
                    .then(validAccessUpdater)
                    .then((e) => _.pick(e.get(), resFilled))
                    .then(resolve)
                    .catch(reject);

            });
        },

        updateByPushUnique(filter, post, fill = Entity.filled, resFilled = Entity.singleFilled) {
            return new Promise((resolve, reject) => {
                const data = _.pick(post, fill);

                return new DB(data)
                    .updateByPushUnique(filter, options)
                    .then(validAccessUpdater)
                    .then((e) => _.pick(e.get(), resFilled))
                    .then(resolve)
                    .catch(reject);

            });

        },

        updateByPull(filter, post, fill = Entity.filled, resFilled = Entity.singleFilled) {
            return new Promise((resolve, reject) => {
                const data = _.pick(post, fill);

                return new DB(data)
                    .updateByPull(filter, options)
                    .then(validAccessUpdater)
                    .then((e) => _.pick(e.get(), resFilled))
                    .then(resolve)
                    .catch(reject);
            });
        },

        increment(filter, post, fill = Entity.filled, resFilled = Entity.singleFilled) {
            return new Promise((resolve, reject) => {
                const data = _.pick(post, fill);

                return new DB(data)
                    .incrementBY(filter, options)
                    .then(validAccessUpdater)
                    .then((e) => _.pick(e.get(), resFilled))
                    .then(resolve)
                    .catch(reject);

            });

        },

        create(post, fill = Entity.filled, resFilled = Entity.singleFilled) {
            return new Promise((resolve, reject) => {
                const data = findFilledFormat(post, fill);
                factoryValid(data, Entity.validators.create);

                return new DB(data)
                    .save()
                    .then((e) => _.pick(e.get(), resFilled))
                    .then(resolve)
                    .catch(reject);

            });

        },

        remove(filter) {
            return new Promise((resolve, reject) => {
                const data = activeTransform.desactive();

                return new DB(data)
                    .updateAndModify(filter)
                    .then(validAccessUpdater)
                    .then(resolve)
                    .catch(reject);

            });
        }
    };
};

module.exports = DBRepository;
