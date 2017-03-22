'use strict';

import {Model} from 'mongorito';
import toObjectId from 'mongorito/util/to-objectid';


class Dao extends Model {

    updateAndModify (filter, options) {

      this.set('updated_at', new Date());

      return this._collection()
        .tap(() => {
          return this._runHooks('before', 'update', options);
        })
        .then((collection) => {
          return collection.update(filter, {$set: this.get()});
        })
        .then(() => {

          return this._runHooks('after', 'update', options);
        })
        .return(this);
    }

    updateById (id) {
      let _id = toObjectId(id);

      return this.updateAndModify({_id});
    }

}

module.exports = Dao;
