'use strict';

import {Model} from 'mongorito';
import toObjectId from 'mongorito/util/to-objectid';


class Dao extends Model {


    updateAndModify(filter) {
        this.set('updated_at', new Date());

        return this.updateFactory(filter, {$set: this.get()});
    }

    updateByPushUnique(id) {
        let _id = toObjectId(id);

        return this.updateFactory({_id}, {$addToSet: this.get()});
    }

    updateByPull(id) {
        let _id = toObjectId(id);

        return this.updateFactory({_id}, {$pull: this.get()});
    }

    updateFactory(entity, entry, options) {

        return this._collection()
            .tap(() => {
                return this._runHooks('before', 'update', options);
            })
            .then((collection) => {
                return collection.update(entity, entry);
            })
            .then((e) => {
                return this.isUpdater = e.result;
            })
            .return(this);
    }

}

module.exports = Dao;
