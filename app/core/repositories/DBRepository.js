'use strict';

const _ = require('lodash');

const Dao = require('./daos/DBConnector');
const ClosurePromesify = require('core/libs/factoryPromisefy');

const findFilledFormat = require('./transforms/findFilledFormat');
const activeTransform = require('./transforms/activeFormat');

const validAccessUpdater = require('./validator/validAccessUpdater');
const factoryValid = require('core/libs/factoryValid');


const DBRepository = (Entity) => {

    const DB = Dao(Entity);

    return {
        find (filters = {}, limit = 20, skip = 0, resFilled = Entity.resFilled) {

            return ClosurePromesify(() => {
                const filter = findFilledFormat(filters, Entity.filled);

                return DB
                    .limit(limit)
                    .skip(skip)
                    .sort('created_at', -1)
                    .include(resFilled)
                    .find(filter)
                    .then((e) => _.map(e, (value) =>  value.get()));
            });
        },

        findOne(filters, resFilled = Entity.singleFilled) {

            return ClosurePromesify(() => {
                const filter = _.merge({}, filters, activeTransform.active());

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
                    .updateAndModify(filter)
                    .then((e) => validAccessUpdater(e))
                    .then((e) => _.pick(e.get(), resFilled));

            });

        },

        updateByPushUnique(filter, post, fill = Entity.filled, resFilled = Entity.singleFilled) {

            return ClosurePromesify(() => {

                const data = _.pick(post, fill);

                return new DB(data)
                    .updateByPushUnique(filter)
                    .then((e) => validAccessUpdater(e))
                    .then((e) => _.pick(e.get(), resFilled));

            });

        },

        updateByPull(filter, post, fill = Entity.filled, resFilled = Entity.singleFilled) {

            return ClosurePromesify(() => {

                const data = _.pick(post, fill);

                return new DB(data)
                    .updateByPull(filter)
                    .then((e) => validAccessUpdater(e))
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
                    .then((e) => validAccessUpdater(e));

            });
        }
    };

};


module.exports = DBRepository;
