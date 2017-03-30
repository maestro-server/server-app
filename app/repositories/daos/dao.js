'use strict';

import {Model} from 'mongorito';
import toObjectId from 'mongorito/util/to-objectid';


class Dao extends Model {

    updateAndModify (id) {
      let _id = toObjectId(id);

      this.set('updated_at', new Date());

      return this.updateFactory({_id}, {$set: this.get()});
    }

    updateByPush (id) {
      let _id = toObjectId(id);

      return this.updateFactory({_id}, {$push: this.get()});
    }

    updateFactory (entity, entry, options) {

      return this._collection()
        .tap(() => {
          return this._runHooks('before', 'update', options);
        })
        .then((collection) => {
          console.log(entry);
          console.log(entity);
          return collection.update(entity, entry);
        })
        .then(() => {

          return this._runHooks('after', 'update', options);
        })
        .return(this);
    }

}

module.exports = Dao;
