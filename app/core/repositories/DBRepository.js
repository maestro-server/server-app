'use strict';

const _ = require('lodash');

const Dao = require('./daos/DBConnector');
const findFilledFormat = require('./format/findFilledFormat');
const ClosurePromesify = require('libs/factoryPromisefy');

const clearDaoTransform = require('./transforms/clearDaoTransform');
const formatRefsCollection = require('./format/formatRefsCollection');
const filledTransform = require('./transforms/filledTransform');
const validAccessUpdater = require('./validators/validAccessUpdater');

const activeTransform = require('./format/activeFormat');

const Access = require('entities/accessRole');

const factoryValid = require('libs/factoryValid');


const DBRepository = (Entity) => {

    const DB = Dao(Entity);

    return {
        filled: Entity.filled,
        resFilled: Entity.resFilled,

        find (filters = {}, limit = 20, skip = 0) {

            return ClosurePromesify(() => {
                filters = findFilledFormat(filters, this.filled);

                return DB
                    .limit(limit)
                    .skip(skip)
                    .sort('created_at', -1)
                    .include(this.resFilled)
                    .find(filters)
                    .then((e) => {
                        return clearDaoTransform(e);
                    });
            });
        },

        count (filters = {}) {
            return ClosurePromesify(() => {

                filters = findFilledFormat(filters, this.filled);

                return DB.count(filters);
            });
        },

        update(filter, post) {

            return ClosurePromesify(() => {
                const fill = _.pull(this.filled, 'owner', Entity.access);
                post = findFilledFormat(post, fill);

                factoryValid(post, Entity.validators.update);
                return new DB(post)
                    .updateAndModify(filter)
                    .then((e) => {
                        return validAccessUpdater(e);
                    })
                    .then((e) => {
                        return filledTransform(e.get(), this.resFilled);
                    });

            });

        },

        create(post) {

            return ClosurePromesify(() => {
                post = findFilledFormat(post, this.filled);
                post = _.merge(post, formatRefsCollection({_id: post.owner._id}, post.owner._refs, Entity.access, {role: Access.ROLE_ADMIN}, true));

                factoryValid(post, Entity.validators.create);
                return new DB(post)
                    .save()
                    .then((e) => {
                        return filledTransform(e.get(), this.resFilled);
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
