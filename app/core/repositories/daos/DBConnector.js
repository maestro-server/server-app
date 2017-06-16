'use strict';

const {Model} = require('mongorito');

const bcrypt = require('bcrypt');
const crypto = require('core/helpers/crypto');


class Dao extends Model {

    configure () {
        super.configure();
        this.before('save', 'passHash');
    }

    /**
     * Password Hashing
     */
    passHash () {
        if (this.get('password'))
            this.set('password', this.makeHash(this.get('password')));
    }

    passwordMatches (matcher) {
        return bcrypt.compareSync(matcher, this.get('password'));
    }

    makeHash (string) {
        return bcrypt.hashSync(string, crypto.getCryptLevel());
    }


    /**
     * Update And Modify
     * @param filter
     * @returns {*}
     */
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


/**
 * Curry Entity to Mongorito
 * @param Entity
 * @returns {Dao}
 */
module.exports = function (Entity) {

    Dao.prototype.collection = () => Entity.name;

    return Dao;
};
