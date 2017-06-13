'use strict';

const Architecture = require('../entities/Architecture');


/**
 *
 * Architecture is Entity to call persisntece layer
 */
const PersistenceApp = require('core/applications/persistenceApplication')(Architecture);


module.exports = {

    list: PersistenceApp.find,

    single: PersistenceApp.findOne,

    autocomplete: PersistenceApp.autocomplete,

    update: PersistenceApp.update,

    create: PersistenceApp.create,

    delete: PersistenceApp.remove

}
