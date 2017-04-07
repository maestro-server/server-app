'use strict';

import {Model} from 'mongorito';
import toObjectId from 'mongorito/util/to-objectid';


class Dao extends Model {

    configure () {
        super.configure();
    }

    updateAndModify(filter) {
        this.set('updated_at', new Date());

        return this.updateFactory(filter, '$set');
    }

    updateByPushUnique(filter) {

        return this.updateFactory(filter, '$addToSet');
    }

    updateByPull(filter) {

        return this.updateFactory(filter, '$pull');
    }

    updateFactory(entity, entry, options) {

        return this._collection()
            .tap(() => {
                return this._runHooks('before', 'update', options);
            })
            .then((collection) => {
                return collection.update(entity, {[entry]: this.get()});
            })
            .then((e) => {
                return this.isUpdater = e.result;
            })
            .return(this);
    }

}

module.exports = Dao;
