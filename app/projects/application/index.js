'use strict';

const Project = require('../entities/Project');

/**
 *
 * Entity to call persisntece layer
 */
const PersistenceApp = require('core/applications/persistenceApplication')(Project);

module.exports = {

    list: PersistenceApp.find,

    single: PersistenceApp.findOne,

    autocomplete: PersistenceApp.autocomplete,

    update: PersistenceApp.update,

    create: PersistenceApp.create,

    delete: PersistenceApp.remove

}
