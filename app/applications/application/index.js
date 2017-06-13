'use strict';

const Application = require('../entities/Application');

/**
 *
 * Entity to call persisntece layer
 */
const PersistenceApp = require('core/applications/persistenceApplication')(Application);


module.exports = {

    list: PersistenceApp.find,

    autocomplete: PersistenceApp.autocomplete,

    single: PersistenceApp.findOne,

    update: PersistenceApp.update,

    create: PersistenceApp.create,

    delete: PersistenceApp.remove

}
