'use strict';

const Team = require('../entities/Teams');

/**
 *
 * Entity to call persisntece layer
 */
const PersistenceApp = require('core/applications/persistenceApplication')(Team);

module.exports = {

    list: PersistenceApp.find,

    single: PersistenceApp.findOne,

    autocomplete: PersistenceApp.autocomplete,

    update: PersistenceApp.update,

    create: PersistenceApp.create,

    delete: PersistenceApp.remove

}

