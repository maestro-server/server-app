'use strict';

const Promise = require('bluebird');
const _ = require('lodash');
const Mongorito = require('./mongorito/libs/mongorito');
const Model = require('core/repositories/daos/mongorito/');
const bcrypt = require('bcrypt');
const crypto = require('core/libs/crypto');

class Dao extends Model {

    _db() {
        let db = this.db ? this.db() : Mongorito._connection;
        return Promise.resolve(db);
    }

    _collection() {
        return this._db().then((db) => {
            if (_.isString(this.collection))
                return Mongorito._collection(db, this.collection);
    
            let defaultName = this.constructor.name.toLowerCase();
            let name = _.result(this, 'collection', defaultName);

            this.collection = this.constructor.prototype.collection = name;
    
            return Mongorito._collection(db, this.collection);
        });
    }

    get(key) {
        let value = key ? _.get(this.attributes, key) : this.attributes;
        return value && value.constructor === Object ? _.clone(value) : value;
    }
    
    set(key, value) {
        // if object passed instead of key-value pair
        // iterate and call set on each item
        if (_.isObject(key)) {
            let attrs = key;
 
            Object.keys(attrs).forEach((k) => {
                this.set(k, attrs[k]);
            });
    
            return;
        }
    
        // check if the value actually changed
        let previousValue = this.get(key);
    
        if (previousValue !== value) {
            _.set(this.previous, key, previousValue);
            _.set(this.attributes, key, value);
            _.set(this.changed, key, true);
        }
    
        return value;
    }
    
    save(options) {
        let id = this.get('_id');
        let fn = id ? this.update : this.create;
    
        if (!options)
            options = {};
    
        let populate = this.options.populate || {};
    
        Object.keys(populate).forEach((key) => {
            let value = this.get(key);
    
            if (Array.isArray(value)) {
                value = value.map(function (doc) {
                    return doc.get('_id');
                });
            } else {
                value = value.get('_id');
            }
    
            this.set(key, value);
        });
    
        return fn.call(this, options);
    }
    
    create() {
        let attrs = this.attributes;
        this.passHash();
        let date = new Date();
    
        this.set({
            'created_at': date,
            'updated_at': date
        });
    
        return this._collection()
            .then((collection) => collection.insert(attrs))
            .then((inserted) => {
                let doc = inserted.ops[0];
                this.set('_id', doc._id);
            })
            .return(this);
    }
    
    
    update() {
        let attrs = this.attributes;
        this.passHash();
    
        this.set('updated_at', new Date());
    
        return this._collection()
            .then((collection) => collection.update({ _id: attrs._id }, attrs))
            .return(this);
    }
    
    passHash() {
        if (this.get('password'))
            this.set('password', this.makeHash(this.get('password')));
    }
    
    makeHash(string) {
        return bcrypt.hashSync(string, crypto.getCryptLevel());
    }
    
    remove() {
        return this._collection()
            .then((collection) => collection.remove({ _id: this.get('_id') }))
            .return(this);
    }
    
    inc(props) {
        let id = this.get('_id');
    
        if (!id)
            throw new Error('Can\'t atomically increment a property of unsaved document.');
    
        return this._collection()
            .then( (collection) => collection.update({ _id: id }, { '$inc': props }))
            .then(() => {
                Object.keys(props).forEach((key) => {
                    let value = this.get(key);
                    value += props[key];
                    this.set(key, value);
                });
            })
            .return(this);
    }

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

        this.passHash();

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
