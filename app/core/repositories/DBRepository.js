'use strict';

const Dao = require('./daos/DBConnector');
const findFilledFormat = require('./format/findFilledFormat');
const ClosurePromesify = require('libs/factoryPromisefy');

const clearDaoTransform = require('./transforms/clearDaoTransform');


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
        }
    }

}


module.exports = DBRepository;
