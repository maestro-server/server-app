'use strict';

const _ = require('lodash');
const {Model} = require('core/repositories/daos/mongorito/');


class Dao extends Model {

    updateFull(filter, options) {
        const opts = _.get(options, 'oUpdater', '');
        const opp = `update${opts}Factory`;
        this.set('updated_at', new Date());

        return this[opp](filter, null, options);
    }

    updateAndModify(filter, options) {
        const opts = _.get(options, 'oUpdater', '');
        const opp = `update${opts}Factory`;
        this.set('updated_at', new Date());

        return this[opp](filter, '$set', options);
    }

    updateByPushUnique(filter, options) {
        const opts = _.get(options, 'oUpdater', '');
        const opp = `update${opts}Factory`;

        return this[opp](filter, '$addToSet', options);
    }

    updateByPull(filter, options) {
        const opts = _.get(options, 'oUpdater', '');
        const opp = `update${opts}Factory`;

        return this[opp](filter, '$pull', options);
    }

    incrementBY(filter, options) {
        const {oUpdater} = options;
        const opp = `update${oUpdater||''}Factory`;

        return this[opp](filter, '$inc', options);
    }

    updateFactory(entity, entry, options) {

        return this._collection()
            .then((collection) => {
                const subs = entry ? {[entry]: this.get()} : this.get();
                return collection.update(entity, subs, options);
            })
            .then((e) => {
                return this.isUpdater = e.result;
            })
            .return(this);
    }

    updateManyFactory(entity, entry, options) {

        return this._collection()
            .then((collection) => {
                const subs = entry ? {[entry]: this.get()} : this.get();
                return collection.updateMany(entity, subs, options);
            })
            .then((e) => {
                return this.isUpdater = e.result;
            })
            .return(this);
    }

    updateBatch(data, options) {

        return this._collection()
            .then((collection) => {
                return collection.bulkWrite(data, options);
            })
            .then((e) => {
                return this.isBatch = e;
            })
            .return(this);
    }
}

module.exports = Dao;
