'use strict';

const {Model} = require('mongorito');

const bcrypt = require('bcrypt');
const crypto = require('core/libs/crypto');


class Dao extends Model {

    configure() {
        super.configure();
        this.before('save', 'passHash');
    }

    /**
     * Password Hashing
     */
    passHash() {
        if (this.get('password'))
            this.set('password', this.makeHash(this.get('password')));
    }

    makeHash(string) {
        return bcrypt.hashSync(string, crypto.getCryptLevel());
    }


    /**
     * Update And Modify
     * @param filter
     * @returns {*}
     */
    updateAndModify(filter, options) {
        this.set('updated_at', new Date());

        return this.updateFactory(filter, '$set', options);
    }

    updateByPushUnique(filter, options) {
        const {oUpdater} = options;
        const opp = `update${oUpdater||''}Factory`;

        return this[opp](filter, '$addToSet', options);
    }

    updateByPull(filter, options) {
        const {oUpdater} = options;
        const opp = `update${oUpdater||''}Factory`;

        return this[opp](filter, '$pull', options);
    }

    incrementBY(filter, options) {
        const {oUpdater} = options;
        const opp = `update${oUpdater||''}Factory`;

        return this[opp](filter, '$inc', options);
    }

    updateFactory(entity, entry, options) {

        return this._collection()
            .tap(() => {
                return this._runHooks('before', 'update');
            })
            .then((collection) => {
                return collection.update(entity, {[entry]: this.get()}, options);
            })
            .then((e) => {
                return this.isUpdater = e.result;
            })
            .return(this);
    }

    updateManyFactory(entity, entry, options) {

        return this._collection()
            .tap(() => {
                return this._runHooks('before', 'update');
            })
            .then((collection) => {
                return collection.updateMany(entity, {[entry]: this.get()}, options);
            })
            .then((e) => {
                return this.isUpdater = e.result;
            })
            .return(this);
    }

}

module.exports = Dao;
