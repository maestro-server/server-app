'use strict';

const Project = require('../entities/Project');

/**
 *
 * Entity to call persisntece layer
 */
const PersistenceApp = require('applications/persistenceApplication')(Project);

module.exports = {

    list: PersistenceApp.find,

    single: PersistenceApp.findOne,

    update: PersistenceApp.update,

    create: PersistenceApp.create,

    delete: PersistenceApp.remove

}
