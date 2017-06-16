'use strict';

const _ = require('lodash');

const Dao = require('./daos/DBConnector');
const findFilledFormat = require('./format/findFilledFormat');
const ClosurePromesify = require('core/libs/factoryPromisefy');

const clearDaoTransform = require('./transforms/clearDaoTransform');
const validAccessUpdater = require('./validators/validAccessUpdater');

const activeTransform = require('./format/activeFormat');

const factoryValid = require('core/libs/factoryValid');


const DBRepository = (Entity) => {

    const DB = Dao(Entity);

    return {
        find (filters = {}, limit = 20, skip = 0, resFilled = Entity.resFilled) {

            return ClosurePromesify(() => {
                filters = findFilledFormat(filters, Entity.filled);

                return DB
                    .limit(limit)
                    .skip(skip)
                    .sort('created_at', -1)
                    .include(resFilled)
                    .find(filters)
                    .then((e) => {
                        return clearDaoTransform(e);
                    });
            });
        },

        findOne(filters, resFilled = Entity.resFilled) {

            return ClosurePromesify(() => {
                filters = _.merge(filters, activeTransform.active());

                return DB
                    .findOne(filters)
                    .then((e) => {
                        if (e)
                            e = e.get();

                        return _.pick(e, resFilled);
                    });
            });

        },

        count (filters = {}, fill = Entity.filled) {
            return ClosurePromesify(() => {

                filters = findFilledFormat(filters, fill);

                return DB.count(filters);
            });
        },

        update(filter, post, fill = Entity.filled) {

            return ClosurePromesify(() => {

                post = findFilledFormat(post, fill);
                factoryValid(post, Entity.validators.update);

                return new DB(post)
                    .updateAndModify(filter)
                    .then((e) => {
                    console.log(e);
                        return validAccessUpdater(e);
                    })
                    .then((e) => {
                        return _.pick(e.get(), Entity.resFilled);
                    });

            });

        },

        create(post) {

            return ClosurePromesify(() => {

                post = findFilledFormat(post, Entity.filled);
                factoryValid(post, Entity.validators.create);

                return new DB(post)
                    .save()
                    .then((e) => {
                        return _.pick(e.get(), Entity.resFilled);
                    });

            });

        },

        remove(filter) {

            return ClosurePromesify(() => {
                const post = activeTransform.desactive();

                return new DB(post)
                    .updateAndModify(filter)
                    .then((e) => {
                        return validAccessUpdater(e);
                    });

            });
        }
    }

}


module.exports = DBRepository;
