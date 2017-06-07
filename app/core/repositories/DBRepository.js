'use strict';

const _ = require('lodash');

const Dao = require('./daos/DBConnector');
const findFilledFormat = require('./format/findFilledFormat');
const ClosurePromesify = require('libs/factoryPromisefy');

const clearDaoTransform = require('./transforms/clearDaoTransform');
const formatRefsCollection = require('./format/formatRefsCollection');
const filledTransform = require('./transforms/filledTransform');

const Access = require('entities/accessRole');


const DBRepository = (Entity) => {

    const DB = Dao(Entity);

    return {
        filled: ['name', 'roles', 'owner'],
        resFilled: ['_id', 'name', 'roles', 'owner'],


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

        create(post) {

            return ClosurePromesify(() => {
                post = findFilledFormat(post, this.filled);

                post = _.merge(post, formatRefsCollection({_id: post.owner._id}, post.owner._refs, 'roles', {role: Access.ROLE_ADMIN}, true));

                return new DB(post)
                    .save()
                    .then((e) => {
                        return filledTransform(e.get(), this.resFilled);
                    });

            });

        }
    }

}


module.exports = DBRepository;
